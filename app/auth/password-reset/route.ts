import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  // const password = String(formData.get('password'))
  const supabase = createRouteHandlerClient({ cookies })

  const { data, error } = await supabase.auth.resetPasswordForEmail(email)
  
  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/forgot-password?error=Could not send password rest email.`,
      {
        status: 301,
      }
    )
  }

  if (data)
  return NextResponse.redirect(
    `${requestUrl.origin}/forgot-password?message=Check email to continue process.`, 
    { status: 301, })
}
 