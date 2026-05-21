import { getPayload } from 'payload'
import config from '../payload.config'

// Helper to create rich text content node
function createTextNode(text: string, format = 0) {
  return {
    type: 'text',
    text,
    format,
    version: 1,
  }
}

function createParagraph(text: string) {
  return {
    type: 'paragraph',
    version: 1,
    children: [createTextNode(text)],
  }
}

function createHeading(text: string, tag: 'h1' | 'h2' | 'h3' = 'h2') {
  return {
    type: 'heading',
    tag,
    version: 1,
    children: [createTextNode(text)],
  }
}

function createList(items: string[]) {
  return {
    type: 'list',
    listType: 'bullet',
    version: 1,
    children: items.map(item => ({
      type: 'listitem',
      version: 1,
      children: [createTextNode(item)],
    })),
  }
}

function createRichTextBlock(nodes: any[]) {
  return {
    blockType: 'richText',
    content: {
      root: {
        type: 'root',
        version: 1,
        children: nodes,
      },
    },
  }
}

function createRichTextForFaq(text: string) {
  return {
    root: {
      type: 'root',
      version: 1,
      children: [createParagraph(text)],
    },
  }
}

const seedSolicitar = async () => {
  try {
    const payload = await getPayload({ config })

    // Find the page "solicitar-apoyo"
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'solicitar-apoyo',
        },
      },
    })

    const pageId = pages.docs?.[0]?.id

    if (!pageId) {
      console.error('Page "solicitar-apoyo" not found. Please create it first.')
      process.exit(1)
    }

    const layoutBlocks = [
      // 1. Hero Block
      {
        blockType: 'hero',
        subtitle: 'Luchando por Ángeles Pequeños A.C.',
        title: 'Solicitar Apoyo Integral',
        text: 'Acompañamos a niñas, niños y adolescentes en su batalla contra el cáncer. Conoce los requisitos y los pasos para solicitar asistencia médica, estudios clínicos o apoyo de traslado.',
        buttons: [
          {
            label: 'Enviar Solicitud por Correo',
            link: 'mailto:contacto@lpap.com.mx',
          },
          {
            label: 'Llamar por Teléfono',
            link: 'tel:8442281480',
          },
        ],
      },

      // 2. Spacer Block
      {
        blockType: 'spacer',
        size: 'small',
      },

      // 3. Features Block
      {
        blockType: 'features',
        title: '¿Quiénes pueden recibir apoyo?',
        items: [
          {
            title: 'Rango de Edad',
            description: 'Apoyamos a niñas, niños y adolescentes diagnosticados con cáncer de entre 0 y 18 años de edad.',
          },
          {
            title: 'Situación Económica',
            description: 'Nuestra labor está enfocada principalmente en brindar apoyo a familias de escasos recursos económicos.',
          },
          {
            title: 'Apoyo Médico y Social',
            description: 'Brindamos asistencia médica integral para asegurar la continuidad del tratamiento oncológico.',
          },
        ],
      },

      // 4. Spacer Block
      {
        blockType: 'spacer',
        size: 'small',
      },

      // 5. Support Form Block
      {
        blockType: 'supportForm',
        title: 'Formulario de Solicitud de Apoyo',
        description: 'Por favor complete todos los datos del paciente y del tutor para iniciar el proceso de evaluación de su caso de manera interactiva.',
      },

      // 6. Spacer Block
      {
        blockType: 'spacer',
        size: 'small',
      },

      // 7. FAQ Block
      {
        blockType: 'faq',
        title: 'Preguntas Frecuentes',
        questions: [
          {
            question: '¿Qué tipo de apoyos otorgan a los niños?',
            answer: createRichTextForFaq('Ofrecemos apoyo en medicamentos oncológicos de especialidad, insumos y material médico para quimioterapias, estudios de laboratorio clínicos, viáticos para traslados terrestres o aéreos a hospitales, despensas nutricionales especializadas y suplementos como Pediasure.'),
          },
          {
            question: '¿Los apoyos tienen algún costo para la familia?',
            answer: createRichTextForFaq('No, absolutamente ninguno. Todos los apoyos y servicios proporcionados por Lucha Por Ángeles Pequeños A.C. son 100% gratuitos y cubiertos en su totalidad gracias a las donaciones de benefactores y eventos de procuración de fondos.'),
          },
          {
            question: '¿Apoyan a niños de otros estados de la República?',
            answer: createRichTextForFaq('Sí. Aunque nuestra sede principal se encuentra en Saltillo, Coahuila, atendemos y canalizamos solicitudes de apoyo de otras partes del país según la viabilidad médica y la disponibilidad de recursos de la asociación en ese momento.'),
          },
        ],
      },
    ]

    console.log(`Updating page with ID: ${pageId}...`)

    await payload.update({
      collection: 'pages',
      id: pageId,
      data: {
        title: 'Solicitar Apoyo',
        layout: layoutBlocks as any,
      },
    })

    console.log('Successfully updated the "Solicitar Apoyo" page content in the database!')
  } catch (error) {
    console.error('Error seeding page content:', error)
  }
  process.exit(0)
}

seedSolicitar()
