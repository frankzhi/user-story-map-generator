import type { StoryMapYAML } from '../types/story';
import { DeepSeekService } from './deepseekService';
import { GeminiService } from './geminiService';

export type AIProvider = 'deepseek' | 'gemini' | 'mock';

export class AIService {
  private static instance: AIService;
  private deepseekService: DeepSeekService;
  private geminiService: GeminiService;
  
  private constructor() {
    this.deepseekService = new DeepSeekService();
    this.geminiService = new GeminiService();
  }
  
  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateStoryMap(productDescription: string, provider: AIProvider = 'mock'): Promise<StoryMapYAML> {
    try {
      switch (provider) {
        case 'deepseek':
          if (this.deepseekService.isConfigured()) {
            return await this.deepseekService.generateStoryMap(productDescription);
          } else {
            console.warn('DeepSeek not configured, falling back to mock data');
            return this.generateMockStoryMap(productDescription);
          }
        
        case 'gemini':
          if (this.geminiService.isConfigured()) {
            return await this.geminiService.generateStoryMap(productDescription);
          } else {
            console.warn('Gemini not configured, falling back to mock data');
            return this.generateMockStoryMap(productDescription);
          }
        
        case 'mock':
        default:
          // Simulate AI processing delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          return this.generateMockStoryMap(productDescription);
      }
    } catch (error) {
      console.error(`Error generating story map with ${provider}:`, error);
      // Fallback to mock data if AI service fails
      return this.generateMockStoryMap(productDescription);
    }
  }

  getAvailableProviders(): { provider: AIProvider; configured: boolean; name: string }[] {
    return [
      {
        provider: 'deepseek',
        configured: this.deepseekService.isConfigured(),
        name: 'DeepSeek'
      },
      {
        provider: 'gemini',
        configured: this.geminiService.isConfigured(),
        name: 'Google Gemini'
      },
      {
        provider: 'mock',
        configured: true,
        name: 'Mock Data (Demo)'
      }
    ];
  }

  private generateMockStoryMap(productDescription: string): StoryMapYAML {
    const keywords = productDescription.toLowerCase();
    
    // Generate different story maps based on keywords
    if (keywords.includes('ecommerce') || keywords.includes('shop') || keywords.includes('store')) {
      return this.generateEcommerceStoryMap();
    } else if (keywords.includes('social') || keywords.includes('network')) {
      return this.generateSocialNetworkStoryMap();
    } else if (keywords.includes('task') || keywords.includes('todo')) {
      return this.generateTaskManagementStoryMap();
    } else {
      return this.generateGenericStoryMap(productDescription);
    }
  }

  private generateEcommerceStoryMap(): StoryMapYAML {
    return {
      title: "E-commerce Platform",
      description: "A comprehensive e-commerce platform for online retail",
      epics: [
        {
          title: "User Management",
          description: "Core user account and authentication functionality",
          features: [
            {
              title: "User Registration",
              description: "Allow users to create accounts",
              tasks: [
                {
                  title: "Registration Form",
                  description: "Create user registration form with validation",
                  priority: "high",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Form includes email, password, and name fields",
                    "Email validation is implemented",
                    "Password strength requirements are enforced"
                  ]
                },
                {
                  title: "Email Verification",
                  description: "Send verification email to new users",
                  priority: "medium",
                  effort: "2 days",
                  acceptance_criteria: [
                    "Verification email is sent upon registration",
                    "Email contains secure verification link",
                    "Account is activated upon email verification"
                  ]
                }
              ]
            },
            {
              title: "User Authentication",
              description: "Login and session management",
              tasks: [
                {
                  title: "Login System",
                  description: "Implement secure login functionality",
                  priority: "high",
                  effort: "2 days",
                  acceptance_criteria: [
                    "Users can login with email and password",
                    "Failed login attempts are tracked",
                    "Session tokens are securely generated"
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Product Catalog",
          description: "Product browsing and search functionality",
          features: [
            {
              title: "Product Listing",
              description: "Display products in a searchable catalog",
              tasks: [
                {
                  title: "Product Grid",
                  description: "Create responsive product grid layout",
                  priority: "high",
                  effort: "4 days",
                  acceptance_criteria: [
                    "Products display in responsive grid",
                    "Each product shows image, title, and price",
                    "Grid adapts to different screen sizes"
                  ]
                },
                {
                  title: "Search Functionality",
                  description: "Implement product search with filters",
                  priority: "medium",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Users can search products by name",
                    "Filter by category, price, and rating",
                    "Search results update in real-time"
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Shopping Cart",
          description: "Cart management and checkout process",
          features: [
            {
              title: "Cart Management",
              description: "Add, remove, and update cart items",
              tasks: [
                {
                  title: "Add to Cart",
                  description: "Allow users to add products to cart",
                  priority: "high",
                  effort: "2 days",
                  acceptance_criteria: [
                    "Users can add products to cart",
                    "Cart quantity is updated",
                    "Cart persists across sessions"
                  ]
                },
                {
                  title: "Cart Review",
                  description: "Display cart contents and totals",
                  priority: "medium",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Cart shows all added items",
                    "Subtotal, tax, and total are calculated",
                    "Users can modify quantities or remove items"
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Infrastructure & Technical",
          description: "Technical infrastructure and non-functional requirements",
          features: [
            {
              title: "Security & Performance",
              description: "Security measures and performance optimization",
              tasks: [
                {
                  title: "Set up SSL/TLS encryption",
                  description: "Implement secure communication protocols for all transactions",
                  priority: "high",
                  effort: "2 days",
                  acceptance_criteria: [
                    "All data transmission is encrypted with TLS 1.3",
                    "SSL certificate is properly configured and auto-renewed",
                    "Security headers (HSTS, CSP) are implemented"
                  ]
                },
                {
                  title: "Implement API rate limiting",
                  description: "Protect against abuse and ensure fair usage of resources",
                  priority: "medium",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Rate limits are enforced per user/IP (100 requests/minute)",
                    "Graceful handling of rate limit exceeded with proper error messages",
                    "Monitoring and alerting for rate limit violations"
                  ]
                },
                {
                  title: "Set up monitoring and alerting",
                  description: "Monitor system health, performance, and business metrics",
                  priority: "medium",
                  effort: "4 days",
                  acceptance_criteria: [
                    "Real-time monitoring of key metrics (response time, error rate, throughput)",
                    "Automated alerts for critical issues (downtime, high error rates)",
                    "Performance dashboards are available for stakeholders"
                  ]
                }
              ]
            },
            {
              title: "Data Management",
              description: "Database and data handling infrastructure",
              tasks: [
                {
                  title: "Design scalable database architecture",
                  description: "Create robust database design for horizontal scaling",
                  priority: "high",
                  effort: "5 days",
                  acceptance_criteria: [
                    "Database supports horizontal scaling with read replicas",
                    "Proper indexing strategy for optimal query performance",
                    "Data backup and recovery procedures with 99.9% uptime SLA"
                  ]
                },
                {
                  title: "Implement caching strategy",
                  description: "Improve performance with intelligent caching layers",
                  priority: "medium",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Redis cache is properly configured for session and data caching",
                    "Cache invalidation strategy is implemented for data consistency",
                    "Performance improvement is measurable (50% reduction in response time)"
                  ]
                },
                {
                  title: "Set up automated security scanning",
                  description: "Implement continuous security vulnerability assessment",
                  priority: "medium",
                  effort: "2 days",
                  acceptance_criteria: [
                    "Automated security scans run daily",
                    "Vulnerability reports are generated and sent to security team",
                    "Integration with CI/CD pipeline for security checks"
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  }

  private generateSocialNetworkStoryMap(): StoryMapYAML {
    return {
      title: "Social Network Platform",
      description: "A social networking platform for connecting people",
      epics: [
        {
          title: "User Profiles",
          description: "User profile creation and management",
          features: [
            {
              title: "Profile Creation",
              description: "Users can create and edit their profiles",
              tasks: [
                {
                  title: "Profile Setup",
                  description: "Create profile setup wizard",
                  priority: "high",
                  effort: "4 days",
                  acceptance_criteria: [
                    "Users can upload profile picture",
                    "Bio and personal information can be added",
                    "Profile is publicly viewable"
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Content Sharing",
          description: "Post and share content with connections",
          features: [
            {
              title: "Post Creation",
              description: "Create and share posts with text and media",
              tasks: [
                {
                  title: "Text Posts",
                  description: "Allow users to create text-based posts",
                  priority: "high",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Users can write and publish text posts",
                    "Posts support basic formatting",
                    "Posts appear in user's feed"
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Infrastructure & Technical",
          description: "Technical infrastructure and non-functional requirements",
          features: [
            {
              title: "Security & Performance",
              description: "Security measures and performance optimization",
              tasks: [
                {
                  title: "Implement user authentication framework",
                  description: "Set up secure user authentication and authorization",
                  priority: "high",
                  effort: "3 days",
                  acceptance_criteria: [
                    "OAuth 2.0 authentication is implemented",
                    "Role-based access control (RBAC) is configured",
                    "Session management with secure token handling"
                  ]
                },
                {
                  title: "Set up content moderation system",
                  description: "Implement automated content filtering and moderation",
                  priority: "medium",
                  effort: "4 days",
                  acceptance_criteria: [
                    "Automated content filtering for inappropriate content",
                    "Manual moderation tools for admin users",
                    "Appeal process for flagged content"
                  ]
                },
                {
                  title: "Implement real-time notifications",
                  description: "Set up WebSocket-based real-time notification system",
                  priority: "medium",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Real-time notifications for new connections and messages",
                    "Push notifications for mobile devices",
                    "Notification preferences can be customized"
                  ]
                }
              ]
            },
            {
              title: "Data Management",
              description: "Database and data handling infrastructure",
              tasks: [
                {
                  title: "Design scalable media storage",
                  description: "Implement scalable storage for user uploads and media",
                  priority: "high",
                  effort: "4 days",
                  acceptance_criteria: [
                    "CDN integration for fast media delivery",
                    "Image optimization and compression",
                    "Backup and redundancy for media files"
                  ]
                },
                {
                  title: "Implement search functionality",
                  description: "Set up full-text search for users and content",
                  priority: "medium",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Elasticsearch integration for fast search",
                    "Search results include users, posts, and comments",
                    "Search suggestions and autocomplete functionality"
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  }

  private generateTaskManagementStoryMap(): StoryMapYAML {
    return {
      title: "Task Management System",
      description: "A comprehensive task and project management platform",
      epics: [
        {
          title: "Task Creation",
          description: "Create and manage individual tasks",
          features: [
            {
              title: "Task Setup",
              description: "Create new tasks with details and assignments",
              tasks: [
                {
                  title: "Task Form",
                  description: "Create task creation form with all fields",
                  priority: "high",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Form includes title, description, and due date",
                    "Users can assign tasks to team members",
                    "Priority levels can be set"
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Project Organization",
          description: "Organize tasks into projects and categories",
          features: [
            {
              title: "Project Management",
              description: "Create and manage project structures",
              tasks: [
                {
                  title: "Project Creation",
                  description: "Allow users to create new projects",
                  priority: "high",
                  effort: "2 days",
                  acceptance_criteria: [
                    "Users can create new projects",
                    "Projects can have multiple tasks",
                    "Project progress is tracked"
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Infrastructure & Technical",
          description: "Technical infrastructure and non-functional requirements",
          features: [
            {
              title: "Security & Performance",
              description: "Security measures and performance optimization",
              tasks: [
                {
                  title: "Set up role-based access control",
                  description: "Implement granular permissions for different user roles",
                  priority: "high",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Admin, manager, and user roles are defined",
                    "Permissions are granular and configurable",
                    "Access control is enforced at API and UI levels"
                  ]
                },
                {
                  title: "Implement audit logging",
                  description: "Track all user actions for compliance and debugging",
                  priority: "medium",
                  effort: "2 days",
                  acceptance_criteria: [
                    "All user actions are logged with timestamps",
                    "Audit logs are searchable and exportable",
                    "Sensitive operations trigger additional logging"
                  ]
                },
                {
                  title: "Set up automated backups",
                  description: "Implement reliable data backup and recovery procedures",
                  priority: "high",
                  effort: "2 days",
                  acceptance_criteria: [
                    "Daily automated backups to secure location",
                    "Backup restoration process is tested monthly",
                    "Data retention policy is implemented"
                  ]
                }
              ]
            },
            {
              title: "Data Management",
              description: "Database and data handling infrastructure",
              tasks: [
                {
                  title: "Design scalable database architecture",
                  description: "Create robust database design for task management",
                  priority: "high",
                  effort: "4 days",
                  acceptance_criteria: [
                    "Database supports concurrent user access",
                    "Proper indexing for task queries and filtering",
                    "Data integrity constraints are enforced"
                  ]
                },
                {
                  title: "Implement real-time collaboration",
                  description: "Enable real-time updates for collaborative task management",
                  priority: "medium",
                  effort: "3 days",
                  acceptance_criteria: [
                    "WebSocket connections for real-time updates",
                    "Conflict resolution for simultaneous edits",
                    "Presence indicators show who's online"
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  }

  private generateGenericStoryMap(productDescription: string): StoryMapYAML {
    return {
      title: "Product Application",
      description: productDescription,
      epics: [
        {
          title: "Core Features",
          description: "Essential functionality for the application",
          features: [
            {
              title: "User Interface",
              description: "Main user interface and navigation",
              tasks: [
                {
                  title: "Homepage Design",
                  description: "Create the main landing page",
                  priority: "high",
                  effort: "5 days",
                  acceptance_criteria: [
                    "Page loads quickly and is responsive",
                    "Navigation is intuitive and accessible",
                    "Content is well-organized and readable"
                  ]
                },
                {
                  title: "User Authentication",
                  description: "Implement user login and registration",
                  priority: "high",
                  effort: "4 days",
                  acceptance_criteria: [
                    "Users can register new accounts",
                    "Secure login functionality",
                    "Password reset capability"
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Data Management",
          description: "Handle data storage and retrieval",
          features: [
            {
              title: "Database Design",
              description: "Design and implement database structure",
              tasks: [
                {
                  title: "Schema Design",
                  description: "Create database schema for the application",
                  priority: "high",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Database supports all required data types",
                    "Relationships are properly defined",
                    "Indexes are optimized for performance"
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "Infrastructure & Technical",
          description: "Technical infrastructure and non-functional requirements",
          features: [
            {
              title: "Security & Performance",
              description: "Security measures and performance optimization",
              tasks: [
                {
                  title: "Set up CI/CD pipeline",
                  description: "Implement automated testing and deployment pipeline",
                  priority: "high",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Automated testing runs on every commit",
                    "Deployment is automated and rollback-capable",
                    "Environment-specific configurations are managed"
                  ]
                },
                {
                  title: "Implement security scanning",
                  description: "Set up automated security vulnerability assessment",
                  priority: "medium",
                  effort: "2 days",
                  acceptance_criteria: [
                    "Automated security scans run daily",
                    "Vulnerability reports are generated",
                    "Integration with CI/CD pipeline"
                  ]
                },
                {
                  title: "Set up monitoring and alerting",
                  description: "Monitor application health and performance",
                  priority: "medium",
                  effort: "3 days",
                  acceptance_criteria: [
                    "Real-time monitoring of key metrics",
                    "Automated alerts for critical issues",
                    "Performance dashboards are available"
                  ]
                }
              ]
            },
            {
              title: "Data Management",
              description: "Database and data handling infrastructure",
              tasks: [
                {
                  title: "Design scalable database architecture",
                  description: "Create robust database design for the application",
                  priority: "high",
                  effort: "4 days",
                  acceptance_criteria: [
                    "Database supports horizontal scaling",
                    "Proper indexing for optimal performance",
                    "Data backup and recovery procedures"
                  ]
                },
                {
                  title: "Implement caching strategy",
                  description: "Improve performance with intelligent caching",
                  priority: "medium",
                  effort: "2 days",
                  acceptance_criteria: [
                    "Redis cache is properly configured",
                    "Cache invalidation strategy is implemented",
                    "Performance improvement is measurable"
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  }

  convertYAMLToStoryMap(yamlData: StoryMapYAML): any {
    // Convert YAML structure to our internal StoryMap format
    const storyMap = {
      id: this.generateId(),
      title: yamlData.title,
      description: yamlData.description,
      epics: yamlData.epics.map((epic, epicIndex) => ({
        id: this.generateId(),
        title: epic.title,
        description: epic.description,
        order: epicIndex,
        features: epic.features.map((feature, featureIndex) => ({
          id: this.generateId(),
          title: feature.title,
          description: feature.description,
          order: featureIndex,
          tasks: feature.tasks.map(task => ({
            id: this.generateId(),
            title: task.title,
            description: task.description,
            type: 'task' as const,
            priority: task.priority as 'high' | 'medium' | 'low',
            status: 'todo' as const,
            acceptanceCriteria: task.acceptance_criteria,
            estimatedEffort: task.effort,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }))
        }))
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return storyMap;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
} 