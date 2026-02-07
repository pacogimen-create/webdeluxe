import { supabase } from '../lib/supabase';

export interface EmailSignupResult {
    success: boolean;
    message: string;
}

export async function submitEmailSignup(email: string): Promise<EmailSignupResult> {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return {
            success: false,
            message: 'Por favor, introduce un email válido',
        };
    }

    try {
        const { data, error } = await supabase
            .from('email_signups')
            .insert([
                {
                    email: email.toLowerCase().trim(),
                    source: 'cta_form',
                },
            ])
            .select();

        if (error) {
            // Check for duplicate email error
            if (error.code === '23505') {
                return {
                    success: false,
                    message: 'Este email ya está registrado',
                };
            }

            console.error('Supabase error:', error);
            return {
                success: false,
                message: 'Hubo un error. Por favor, inténtalo de nuevo',
            };
        }

        return {
            success: true,
            message: '¡Gracias! Te contactaremos pronto',
        };
    } catch (error) {
        console.error('Unexpected error:', error);
        return {
            success: false,
            message: 'Hubo un error. Por favor, inténtalo de nuevo',
        };
    }
}
