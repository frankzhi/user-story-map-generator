import type { StoryMapYAML } from '../types/story';



interface GeminiRequest {
  contents: Array<{
    role: 'user';
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig: {
    temperature: number;
    maxOutputTokens: number;
  };
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export class GeminiService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    try {
      this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      this.apiUrl = import.meta.env.VITE_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    } catch (error) {
      console.warn('Failed to initialize Gemini service:', error);
      this.apiKey = '';
      this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    }
  }

  async generateStoryMap(productDescription: string): Promise<StoryMapYAML> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your environment variables.');
    }

    const prompt = `You are an expert product manager and user story mapping specialist.

Your task is to generate a comprehensive user story map from a product description. 
The response should be a valid JSON object with the following structure:

{
  "title": "Product Title",
  "description": "Product Description",
  "epics": [
    {
      "title": "Epic Title",
      "description": "Epic Description",
      "features": [
        {
          "title": "Feature Title",
          "description": "Feature Description",
          "tasks": [
            {
              "title": "Task Title",
              "description": "Task Description",
              "priority": "high|medium|low",
              "effort": "X days",
              "acceptance_criteria": [
                "Criteria 1",
                "Criteria 2",
                "Criteria 3"
              ]
            }
          ]
        }
      ]
    }
  ]
}

IMPORTANT GUIDELINES FOR STORY GENERATION:

1. USER STORIES (Tasks):
   - Focus on user value and business outcomes
   - Write from the user's perspective: "As a [user], I want [goal] so that [benefit]"
   - Make them specific, actionable, and testable
   - Include clear acceptance criteria

2. ENABLING STORIES (Supporting Requirements):
   - These are NOT just rephrased user stories
   - Analyze the product description and identify specific technical infrastructure needs
   - Generate enabling stories that directly support the user stories you create
   - Consider the following categories based on the product type:
     
     FOR WEB APPLICATIONS:
     * Authentication and authorization systems
     * Database design and optimization
     * API development and security
     * Frontend framework setup
     * CI/CD pipeline configuration
     * Monitoring and logging systems
     * Performance optimization (caching, CDN)
     * Security measures (SSL, rate limiting, input validation)
     
     FOR MOBILE APPLICATIONS:
     * Mobile app development framework setup
     * Backend API development
     * Push notification infrastructure
     * Offline data synchronization
     * App store deployment preparation
     * Device compatibility testing framework
     * Performance monitoring for mobile
     
     FOR ENTERPRISE APPLICATIONS:
     * Role-based access control (RBAC)
     * Audit logging and compliance
     * Data backup and disaster recovery
     * Integration with existing enterprise systems
     * Scalability and load balancing
     * Security compliance (GDPR, SOC2, etc.)
     
     FOR E-COMMERCE APPLICATIONS:
     * Payment gateway integration
     * Inventory management system
     * Order processing workflow
     * Customer data management
     * Shipping and logistics integration
     * Fraud detection systems
     
     FOR SOCIAL/MEDIA APPLICATIONS:
     * Content moderation systems
     * Real-time communication infrastructure
     * Media storage and CDN setup
     * User privacy and data protection
     * Scalable content delivery
     * Social features (likes, comments, sharing)

3. EPIC STRUCTURE:
   - Create 3-5 epics that cover main functional areas
   - ALWAYS include at least one "Infrastructure & Technical" epic for enabling stories
   - Each epic should have 2-4 features
   - Each feature should have 3-6 tasks

4. PRIORITY AND EFFORT:
   - Priority based on business value and user impact
   - Effort should be realistic (1-5 days per task)
   - Enabling stories often have medium priority but are critical for delivery

5. ACCEPTANCE CRITERIA:
   - For user stories: Focus on user behavior and outcomes
   - For enabling stories: Focus on technical requirements, performance metrics, and system capabilities
   - Make acceptance criteria specific and measurable

Generate a user story map for this product: ${productDescription}

Return ONLY the JSON object, no additional text or explanations.`;

    const requestBody: GeminiRequest = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4000
      }
    };

    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data: GeminiResponse = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        throw new Error('No response content from Gemini API');
      }

      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in Gemini response');
      }

      const storyMap = JSON.parse(jsonMatch[0]);
      return this.validateAndTransformResponse(storyMap);

    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error(`Failed to generate story map: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private validateAndTransformResponse(response: any): StoryMapYAML {
    // Basic validation
    if (!response.title || !response.description || !Array.isArray(response.epics)) {
      throw new Error('Invalid response structure from Gemini API');
    }

    // Transform and validate the response
    const transformed: StoryMapYAML = {
      title: response.title,
      description: response.description,
      epics: response.epics.map((epic: any) => ({
        title: epic.title || 'Untitled Epic',
        description: epic.description || '',
        features: (epic.features || []).map((feature: any) => ({
          title: feature.title || 'Untitled Feature',
          description: feature.description || '',
          tasks: (feature.tasks || []).map((task: any) => ({
            title: task.title || 'Untitled Task',
            description: task.description || '',
            priority: task.priority || 'medium',
            effort: task.effort || '2 days',
            acceptance_criteria: Array.isArray(task.acceptance_criteria) 
              ? task.acceptance_criteria 
              : ['Acceptance criteria not specified']
          }))
        }))
      }))
    };

    return transformed;
  }

  isConfigured(): boolean {
    try {
      return !!this.apiKey;
    } catch (error) {
      console.warn('Error checking Gemini configuration:', error);
      return false;
    }
  }
} 