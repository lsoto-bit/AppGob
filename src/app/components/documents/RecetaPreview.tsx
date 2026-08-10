import {
  OfficialDocumentCard,
  OfficialDocumentField,
  OfficialDocumentFields,
  OfficialDocumentFooter,
  OfficialDocumentHeader,
} from "./OfficialDocumentCard";

export type RecetaMedicamento = {
  nombre: string;
  indicacion: string;
  cantidad: string;
};

export type RecetaPreviewDoc = {
  name: string;
  number: string;
  expiry: string;
  sub?: string;
  medicamentos?: RecetaMedicamento[];
};

const DEFAULT_MEDICAMENTOS: RecetaMedicamento[] = [
  { nombre: "Losartán 50 mg", indicacion: "1 comprimido cada 12 horas", cantidad: "60 comp." },
  { nombre: "Atorvastatina 20 mg", indicacion: "1 comprimido en la noche", cantidad: "30 comp." },
];

function extractIssuedDate(name: string) {
  return name.replace(/^Receta electrónica —\s*/i, "");
}

function PrescriptionMedicationsList({ items }: { items: RecetaMedicamento[] }) {
  return (
    <div className="border-t border-[#0046a8] p-4">
      <p className="pb-1 text-[8px] tracking-[0.8px] text-[#666]">Medicamentos prescritos</p>
      <div className="border border-[#ccc]">
        {items.map((medicamento, index) => (
          <div
            key={medicamento.nombre}
            className={`flex flex-col gap-0.5 px-3 py-2 ${
              index < items.length - 1 ? "border-b border-[#ccc]" : ""
            }`}
          >
            <p className="text-[16px] leading-[18px] text-[#333]">{medicamento.nombre}</p>
            <p className="text-[8px] leading-[12px] text-[#666]">{medicamento.indicacion}</p>
            <p className="text-[8px] leading-[12px] text-[#666]">Cantidad: {medicamento.cantidad}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecetaPreview({ doc }: { doc: RecetaPreviewDoc }) {
  const medicamentos = doc.medicamentos ?? DEFAULT_MEDICAMENTOS;

  return (
    <OfficialDocumentCard>
      <OfficialDocumentHeader title="Receta Electrónica" issuer="Ministerio de Salud" />
      <OfficialDocumentFields className="gap-3 p-4">
        <OfficialDocumentField label="Paciente" value="VALENZUELA ROJAS, MARÍA ANDREA" />
        <OfficialDocumentField label="RUN" value="14.582.301-K" />
        <OfficialDocumentField label="N.° receta" value={doc.number} />
        {doc.sub && <OfficialDocumentField label="Prescriptor" value={doc.sub} />}
        <OfficialDocumentField label="Fecha de emisión" value={extractIssuedDate(doc.name)} />
        <OfficialDocumentField label="Vencimiento" value={doc.expiry} />
      </OfficialDocumentFields>
      <PrescriptionMedicationsList items={medicamentos} />
      <OfficialDocumentFooter signatureLabel="Firma médico prescriptor" />
    </OfficialDocumentCard>
  );
}
