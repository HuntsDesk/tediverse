export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          avatar_url: string | null
          created_at: string
          last_login: string | null
        }
        Insert: {
          id: string
          name: string
          avatar_url?: string | null
          created_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          name?: string
          avatar_url?: string | null
          created_at?: string
          last_login?: string | null
        }
      }
      activities: {
        Row: {
          id: string
          user_id: string
          title: string
          type: 'daily_schedule' | 'homework' | 'emotion_tool'
          emoji: string | null
          time_scheduled: string | null
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          type: 'daily_schedule' | 'homework' | 'emotion_tool'
          emoji?: string | null
          time_scheduled?: string | null
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          type?: 'daily_schedule' | 'homework' | 'emotion_tool'
          emoji?: string | null
          time_scheduled?: string | null
          completed?: boolean
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          user_id: string
          from_type: 'parent' | 'teacher'
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          from_type: 'parent' | 'teacher'
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          from_type?: 'parent' | 'teacher'
          content?: string
          read?: boolean
          created_at?: string
        }
      }
      stars: {
        Row: {
          id: string
          user_id: string
          amount: number
          reason: string | null
          activity_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          reason?: string | null
          activity_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          reason?: string | null
          activity_id?: string | null
          created_at?: string
        }
      }
      emotion_logs: {
        Row: {
          id: string
          user_id: string
          emotion: string
          response: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          emotion: string
          response?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          emotion?: string
          response?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
