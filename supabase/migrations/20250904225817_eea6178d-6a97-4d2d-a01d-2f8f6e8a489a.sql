-- Strengthen RLS policies for profiles table to ensure maximum security
-- Drop existing policies to recreate them with enhanced security
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles are created only by trigger" ON public.profiles;

-- Create enhanced RLS policies with explicit security checks
CREATE POLICY "Users can only view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can only update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Profiles created only by system trigger" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (false);

-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;