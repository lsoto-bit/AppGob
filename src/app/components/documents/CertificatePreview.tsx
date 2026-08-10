import { ChileEscudo } from "./DocumentAssets";
import {
  OfficialDocumentCard,
  OfficialDocumentField,
  OfficialDocumentFields,
  OfficialDocumentFooter,
  OfficialDocumentHeader,
} from "./OfficialDocumentCard";

export type CertificatePreviewDoc = {
  name: string;
  number: string;
  expiry: string;
  sub?: string;
  category?: string;
};

const DEFAULT_ISSUER = "Servicio de Registro civil e identificación";

function resolveIssuer(doc: CertificatePreviewDoc) {
  if (doc.category === "registro-civil") return DEFAULT_ISSUER;
  if (doc.category === "afiliacion") {
    return doc.sub?.split("—")[0]?.trim() ?? "FONASA";
  }
  return doc.sub ?? DEFAULT_ISSUER;
}

export function CertificatePreview({ doc }: { doc: CertificatePreviewDoc }) {
  return (
    <OfficialDocumentCard>
      <OfficialDocumentHeader
        emblem={<ChileEscudo />}
        title={doc.name}
        issuer={resolveIssuer(doc)}
      />
      <OfficialDocumentFields>
        <OfficialDocumentField label="Titular" value="VALENZUELA ROJAS, MARÍA ANDREA" />
        <OfficialDocumentField label="RUN" value="14.582.301-K" />
        <OfficialDocumentField label="N.° documento" value={doc.number} />
        <OfficialDocumentField label="Fecha de emisión" value="01 Jun 2026" />
        <OfficialDocumentField label="Vigencia" value={doc.expiry} />
        {doc.sub && <OfficialDocumentField label="Institución" value={doc.sub} />}
      </OfficialDocumentFields>
      <OfficialDocumentFooter signatureLabel="Firma autorizada" />
    </OfficialDocumentCard>
  );
}
