export interface Medicine {
  name: string;
  dosage: string;
  quantity: string;
}

export interface PrescriptionAnalysis {
  condition: string;
  medicines: Medicine[];
  instructions: string;
  rawText: string;
}

export async function analyzePrescritionImage(file: File): Promise<PrescriptionAnalysis> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64String = (reader.result as string).split(',')[1];
        const mimeType = file.type || 'image/jpeg';

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        const response = await fetch(
          `${supabaseUrl}/functions/v1/analyze-prescription`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${anonKey}`,
            },
            body: JSON.stringify({
              imageBase64: base64String,
              mimeType: mimeType,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Analysis failed: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.success) {
          resolve(result.analysis);
        } else {
          throw new Error(result.error || 'Failed to analyze prescription');
        }
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

export function formatPrescriptionForMessage(analyses: PrescriptionAnalysis[]): string {
  const sections: string[] = [];

  for (let i = 0; i < analyses.length; i++) {
    const analysis = analyses[i];
    sections.push(`📄 Prescription ${i + 1}:`);

    if (analysis.condition && analysis.condition !== 'Not clearly visible') {
      sections.push(`Condition: ${analysis.condition}`);
    }

    if (analysis.medicines && analysis.medicines.length > 0) {
      sections.push('Medicines:');
      for (const med of analysis.medicines) {
        if (med.name && med.name !== 'Not clearly visible') {
          const dosage = med.dosage ? ` - ${med.dosage}` : '';
          const quantity = med.quantity ? ` (${med.quantity})` : '';
          sections.push(`• ${med.name}${dosage}${quantity}`);
        }
      }
    }

    if (analysis.instructions && analysis.instructions !== 'Not clearly visible') {
      sections.push(`Instructions: ${analysis.instructions}`);
    }

    sections.push('');
  }

  return sections.join('\n');
}
