import { Resend } from 'resend';
import {NextResponse} from 'next/server';
import EmailTemplate from '../../../../../emails/my-email';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req){
    const response = await req.json()
    try{
       const data= await resend.emails.send({
            from: 'Doctor-Appointment-Booking@harshita.com',
            to: [response.data.Email],
            subject: 'Booking Appointment Confirmation',
        react: EmailTemplate({response})
          });
         return NextResponse.json({data})
    }
    catch(error){
        return NextResponse.json({error})
    }
}