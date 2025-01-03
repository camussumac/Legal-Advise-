export async function readPdfContent(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://api.pdf.co/v1/pdf/extract/text', {
      method: 'POST',
      headers: {
        'x-api-key': import.meta.env.VITE_PDF_API_KEY || '',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al procesar el PDF');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error al leer el PDF:', error);
    throw new Error('No se pudo procesar el archivo PDF');
  }
}

export async function uploadFileToStorage(file: File, userId: string) {
  try {
    const { data, error } = await supabase.storage
      .from('contracts')
      .upload(`${userId}/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    return data.path;
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    throw error;
  }
}