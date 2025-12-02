export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          admin_user_id: string
          id: string
          ip_address: unknown
          new_value: Json | null
          old_value: Json | null
          target_user_id: string
          timestamp: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_user_id: string
          id?: string
          ip_address?: unknown
          new_value?: Json | null
          old_value?: Json | null
          target_user_id: string
          timestamp?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string
          id?: string
          ip_address?: unknown
          new_value?: Json | null
          old_value?: Json | null
          target_user_id?: string
          timestamp?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      ai_advice: {
        Row: {
          ai_advice_description: string
          category: string | null
          created_at: string
          full_analysis: string | null
          id: string
          image_caption: string | null
          image_prompt: string | null
          image_url: string | null
          impact: string | null
          recommendations: string[] | null
          sequence: number
          subjects: string[] | null
          summary: string | null
          system_entry: boolean | null
          tags: string[] | null
          timeframe: string | null
          title: string | null
          updated_at: string
          user_id: string | null
          user_prompt: string
        }
        Insert: {
          ai_advice_description: string
          category?: string | null
          created_at?: string
          full_analysis?: string | null
          id?: string
          image_caption?: string | null
          image_prompt?: string | null
          image_url?: string | null
          impact?: string | null
          recommendations?: string[] | null
          sequence: number
          subjects?: string[] | null
          summary?: string | null
          system_entry?: boolean | null
          tags?: string[] | null
          timeframe?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
          user_prompt: string
        }
        Update: {
          ai_advice_description?: string
          category?: string | null
          created_at?: string
          full_analysis?: string | null
          id?: string
          image_caption?: string | null
          image_prompt?: string | null
          image_url?: string | null
          impact?: string | null
          recommendations?: string[] | null
          sequence?: number
          subjects?: string[] | null
          summary?: string | null
          system_entry?: boolean | null
          tags?: string[] | null
          timeframe?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
          user_prompt?: string
        }
        Relationships: []
      }
      challenge_attempted: {
        Row: {
          attempt_count: number | null
          attempted_at: string
          challenge_id: string
          challenge_type: string
          created_at: string
          id: string
          list_name: string | null
          question_identifier: string | null
          user_id: string
          was_correct: boolean
        }
        Insert: {
          attempt_count?: number | null
          attempted_at?: string
          challenge_id: string
          challenge_type: string
          created_at?: string
          id?: string
          list_name?: string | null
          question_identifier?: string | null
          user_id: string
          was_correct?: boolean
        }
        Update: {
          attempt_count?: number | null
          attempted_at?: string
          challenge_id?: string
          challenge_type?: string
          created_at?: string
          id?: string
          list_name?: string | null
          question_identifier?: string | null
          user_id?: string
          was_correct?: boolean
        }
        Relationships: []
      }
      communications: {
        Row: {
          created_at: string
          id: string
          response: string | null
          sequence: number
          significants_awarded: number | null
          status: string
          tags: string[] | null
          timestamp: string
          title: string
          type: string
          updated_at: string
          user_id: string
          user_report: string
        }
        Insert: {
          created_at?: string
          id?: string
          response?: string | null
          sequence: number
          significants_awarded?: number | null
          status?: string
          tags?: string[] | null
          timestamp?: string
          title: string
          type: string
          updated_at?: string
          user_id: string
          user_report: string
        }
        Update: {
          created_at?: string
          id?: string
          response?: string | null
          sequence?: number
          significants_awarded?: number | null
          status?: string
          tags?: string[] | null
          timestamp?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
          user_report?: string
        }
        Relationships: []
      }
      inventory: {
        Row: {
          capacity: string | null
          category: string
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          notes: string | null
          quantity: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          capacity?: string | null
          category: string
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          notes?: string | null
          quantity?: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          capacity?: string | null
          category?: string
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          notes?: string | null
          quantity?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      k_docs: {
        Row: {
          author_id: string | null
          category: string | null
          classification: string | null
          content: string
          created_at: string | null
          id: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          version: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          classification?: string | null
          content: string
          created_at?: string | null
          id?: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          classification?: string | null
          content?: string
          created_at?: string | null
          id?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          version?: string | null
        }
        Relationships: []
      }
      learned: {
        Row: {
          category: string
          connections: string[] | null
          content: string
          created_at: string
          cycle_level: number
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          connections?: string[] | null
          content: string
          created_at?: string
          cycle_level?: number
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          connections?: string[] | null
          content?: string
          created_at?: string
          cycle_level?: number
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          story_progress: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          story_progress?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          story_progress?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          priority: string
          proj_cat: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          priority?: string
          proj_cat: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          priority?: string
          proj_cat?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          category: string
          correct_answer: number
          created_at: string
          explanation: string | null
          id: string
          options: Json
          question_text: string
          sequence_order: number
          story_node_id: string
          thinking_level: string | null
          updated_at: string
        }
        Insert: {
          category?: string
          correct_answer: number
          created_at?: string
          explanation?: string | null
          id?: string
          options: Json
          question_text: string
          sequence_order?: number
          story_node_id: string
          thinking_level?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          correct_answer?: number
          created_at?: string
          explanation?: string | null
          id?: string
          options?: Json
          question_text?: string
          sequence_order?: number
          story_node_id?: string
          thinking_level?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_quiz_questions_story_node"
            columns: ["story_node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      radio_spirit: {
        Row: {
          additional_synchronicity_notes: string | null
          alignment_notes: string | null
          created_at: string
          id: string
          lyrical_line: string | null
          musical_performer: string | null
          sequence: number
          significants_awarded: number | null
          song_title: string | null
          status: string
          synchronicity_analysis: string | null
          tags: string[] | null
          title: string
          unanswered_question: string | null
          updated_at: string
          user_id: string
          user_report: string | null
        }
        Insert: {
          additional_synchronicity_notes?: string | null
          alignment_notes?: string | null
          created_at?: string
          id?: string
          lyrical_line?: string | null
          musical_performer?: string | null
          sequence: number
          significants_awarded?: number | null
          song_title?: string | null
          status?: string
          synchronicity_analysis?: string | null
          tags?: string[] | null
          title: string
          unanswered_question?: string | null
          updated_at?: string
          user_id: string
          user_report?: string | null
        }
        Update: {
          additional_synchronicity_notes?: string | null
          alignment_notes?: string | null
          created_at?: string
          id?: string
          lyrical_line?: string | null
          musical_performer?: string | null
          sequence?: number
          significants_awarded?: number | null
          song_title?: string | null
          status?: string
          synchronicity_analysis?: string | null
          tags?: string[] | null
          title?: string
          unanswered_question?: string | null
          updated_at?: string
          user_id?: string
          user_report?: string | null
        }
        Relationships: []
      }
      significants: {
        Row: {
          amount: number
          id: string
          level: string
          reason: string | null
          rewarded_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          id?: string
          level?: string
          reason?: string | null
          rewarded_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          id?: string
          level?: string
          reason?: string | null
          rewarded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      songs: {
        Row: {
          analysis: Json | null
          artist: string
          category: string
          created_at: string
          description: string
          duration: string
          id: number
          importance: string
          title: string
          updated_at: string
        }
        Insert: {
          analysis?: Json | null
          artist: string
          category: string
          created_at?: string
          description: string
          duration: string
          id: number
          importance: string
          title: string
          updated_at?: string
        }
        Update: {
          analysis?: Json | null
          artist?: string
          category?: string
          created_at?: string
          description?: string
          duration?: string
          id?: number
          importance?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      soundtrack_songs: {
        Row: {
          created_at: string
          id: string
          ranking: number
          sequential_order: number
          song_id: number | null
          soundtrack_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ranking: number
          sequential_order: number
          song_id?: number | null
          soundtrack_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ranking?: number
          sequential_order?: number
          song_id?: number | null
          soundtrack_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "soundtrack_songs_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "soundtrack_songs_soundtrack_id_fkey"
            columns: ["soundtrack_id"]
            isOneToOne: false
            referencedRelation: "soundtracks"
            referencedColumns: ["id"]
          },
        ]
      }
      soundtracks: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          scope: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id: string
          name: string
          scope: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          scope?: string
          updated_at?: string
        }
        Relationships: []
      }
      standard_inventory: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          name: string
          notes: string | null
          priority: string
          required_quantity: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          name: string
          notes?: string | null
          priority?: string
          required_quantity?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          notes?: string | null
          priority?: string
          required_quantity?: number
          updated_at?: string
        }
        Relationships: []
      }
      stories: {
        Row: {
          cover_image: string | null
          created_at: string
          description: string
          id: string
          level: string
          tags: string[] | null
          title: string
          user_id: string | null
          views: number
          votes: number
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          description: string
          id?: string
          level: string
          tags?: string[] | null
          title: string
          user_id?: string | null
          views?: number
          votes?: number
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          description?: string
          id?: string
          level?: string
          tags?: string[] | null
          title?: string
          user_id?: string | null
          views?: number
          votes?: number
        }
        Relationships: []
      }
      story_choices: {
        Row: {
          created_at: string
          id: string
          next_node_id: string | null
          node_id: string
          sequence_order: number | null
          text: string
        }
        Insert: {
          created_at?: string
          id?: string
          next_node_id?: string | null
          node_id: string
          sequence_order?: number | null
          text: string
        }
        Update: {
          created_at?: string
          id?: string
          next_node_id?: string | null
          node_id?: string
          sequence_order?: number | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_choices_next_node_id_fkey"
            columns: ["next_node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_choices_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "story_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      story_nodes: {
        Row: {
          anagram: string | null
          chapter: number | null
          content: string
          created_at: string
          end_node: boolean | null
          estimated_read_time: number | null
          hint: string | null
          id: string
          image: string | null
          sequence_order: number | null
          significant_reward: number | null
          story_id: string
        }
        Insert: {
          anagram?: string | null
          chapter?: number | null
          content: string
          created_at?: string
          end_node?: boolean | null
          estimated_read_time?: number | null
          hint?: string | null
          id?: string
          image?: string | null
          sequence_order?: number | null
          significant_reward?: number | null
          story_id: string
        }
        Update: {
          anagram?: string | null
          chapter?: number | null
          content?: string
          created_at?: string
          end_node?: boolean | null
          estimated_read_time?: number | null
          hint?: string | null
          id?: string
          image?: string | null
          sequence_order?: number | null
          significant_reward?: number | null
          story_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_nodes_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      task_status_history: {
        Row: {
          changed_at: string | null
          id: string
          status: string
          task_id: string
          user_id: string
        }
        Insert: {
          changed_at?: string | null
          id?: string
          status: string
          task_id: string
          user_id: string
        }
        Update: {
          changed_at?: string | null
          id?: string
          status?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_status_history_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          area: Database["public"]["Enums"]["task_area"]
          created_at: string | null
          description: string | null
          id: string
          priority: string
          project_id: string | null
          status: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          area: Database["public"]["Enums"]["task_area"]
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string
          project_id?: string | null
          status?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          area?: Database["public"]["Enums"]["task_area"]
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string
          project_id?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_shattered_core_quiz_questions: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_story_views: { Args: { story_id: string }; Returns: undefined }
      insert_system_advice: {
        Args: {
          p_ai_advice_description?: string
          p_category: string
          p_full_analysis: string
          p_impact: string
          p_recommendations: string[]
          p_summary: string
          p_tags: string[]
          p_timeframe: string
          p_title: string
          p_user_prompt?: string
        }
        Returns: string
      }
      is_current_user_admin: { Args: never; Returns: boolean }
      log_admin_action: {
        Args: {
          p_action: string
          p_new_value?: Json
          p_old_value?: Json
          p_target_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      task_area: "outdoor" | "computer" | "construction" | "home"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      task_area: ["outdoor", "computer", "construction", "home"],
    },
  },
} as const
