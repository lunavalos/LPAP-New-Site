import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, interestedIn, message } = await req.json()

    // Validaciones básicas
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Todos los campos obligatorios deben ser completados' }, { status: 400 })
    }

    // Configuración del transporte SMTP
    const port = parseInt(process.env.SMTP_PORT || '465', 10)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.lpap.com.mx',
      port: port,
      secure: port === 465, // true para puerto 465 (SSL/TLS), false para otros (e.g. 587 con STARTTLS)
      auth: {
        user: process.env.SMTP_USER || 'noreply@lpap.com.mx',
        pass: process.env.SMTP_PASS, // contraseña secreta
      },
      tls: {
        // No fallar si el certificado es auto-firmado o no coincide con el host (común en servidores de correo locales/personalizados)
        rejectUnauthorized: false,
      },
    })

    // Construcción del correo HTML
    const mailOptions = {
      from: `"${name} (vía Web)" <${process.env.SMTP_USER || 'noreply@lpap.com.mx'}>`, // remitente
      to: process.env.SMTP_TO || 'contacto@lpap.com.mx', // destinatario
      replyTo: email, // permite responder directamente al correo del usuario
      subject: `Nuevo mensaje de contacto: ${interestedIn}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 12px; background-color: #fcfcfd;">
          <div style="background: linear-gradient(90deg, #f4852b 0%, #dc5da3 100%); padding: 20px; border-radius: 8px 8px 0 0; text-align: center; color: #fff;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">Nuevo Mensaje de Contacto</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Recibido desde el sitio web oficial de LPAP</p>
          </div>
          
          <div style="padding: 24px; color: #333;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr style="border-bottom: 1px solid #f1f3f5;">
                <td style="padding: 12px 0; font-weight: 800; color: #888; text-transform: uppercase; font-size: 11px; width: 150px;">Nombre</td>
                <td style="padding: 12px 0; font-size: 15px; font-weight: 600; color: #111;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f3f5;">
                <td style="padding: 12px 0; font-weight: 800; color: #888; text-transform: uppercase; font-size: 11px;">Correo electrónico</td>
                <td style="padding: 12px 0; font-size: 15px; font-weight: 600; color: #111;"><a href="mailto:${email}" style="color: #f4852b; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f3f5;">
                <td style="padding: 12px 0; font-weight: 800; color: #888; text-transform: uppercase; font-size: 11px;">Teléfono</td>
                <td style="padding: 12px 0; font-size: 15px; font-weight: 600; color: #111;"><a href="tel:${phone}" style="color: #111; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f3f5;">
                <td style="padding: 12px 0; font-weight: 800; color: #888; text-transform: uppercase; font-size: 11px;">Interés</td>
                <td style="padding: 12px 0; font-size: 15px; font-weight: 600; color: #111;">${interestedIn}</td>
              </tr>
            </table>

            <div style="background-color: #fff; border: 1.5px solid #f1f3f5; border-radius: 8px; padding: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.01);">
              <h4 style="margin: 0 0 10px 0; color: #888; font-weight: 800; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px;">Mensaje o Consulta:</h4>
              <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #444; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <div style="border-top: 1px solid #eee; padding-top: 16px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">Este es un mensaje automático enviado desde el formulario de contacto de la página web.</p>
            <p style="margin: 4px 0 0 0;">© ${new Date().getFullYear()} Lucha Por Ángeles Pequeños, A.C.</p>
          </div>
        </div>
      `,
    }

    // Enviar el correo
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Error al enviar correo SMTP:', err)
    return NextResponse.json({ error: err.message || 'Error al procesar el envío' }, { status: 500 })
  }
}
