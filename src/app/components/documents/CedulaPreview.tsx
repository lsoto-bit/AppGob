import {
  ChileEscudo,
  DocumentFingerprintPlaceholder,
  DocumentPhotoPlaceholder,
  DocumentQrCode,
} from "./DocumentAssets";
import {
  OfficialDocumentCard,
  OfficialDocumentField,
} from "./OfficialDocumentCard";

export type CedulaPreviewDoc = {
  expiry: string;
  apellidos?: string;
  nombres?: string;
  run?: string;
  fechaNacimiento?: string;
  nacionalidad?: string;
  sexo?: string;
  nacCan?: string;
  nacioEn?: string;
  profesion?: string;
  mrz?: [string, string, string];
};

const DEFAULT_CEDULA: Required<
  Omit<CedulaPreviewDoc, "expiry"> & { expiry?: string }
> = {
  apellidos: "VALENZUELA ROJAS",
  nombres: "MARÍA ANDREA",
  run: "14.582.301-K",
  fechaNacimiento: "12/04/1985",
  nacionalidad: "CHILENA",
  sexo: "F",
  nacCan: "123456",
  nacioEn: "Santiago",
  profesion: "Asistente Social",
  mrz: [
    "IDCHL14582301K<<<<<<<<<<<<<<<",
    "8504122F2608150CHL<<<<<<<<<<<<<2",
    "VALENZUELA<ROJAS<<MARIA<ANDREA<<<<<",
  ],
};

function CedulaDocumentHeader() {
  return (
    <div className="flex items-center gap-4 bg-primary px-4 py-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <ChileEscudo />
        <div className="min-w-0 text-[10px] leading-[1.2] tracking-[0.7px] text-white">
          <p>Cédula de</p>
          <p>Identidad</p>
        </div>
      </div>
      <div className="shrink-0 text-right text-white">
        <p className="text-[10px] tracking-[0.7px]">República de Chile</p>
        <p className="text-[10px] tracking-[0.7px]">Servicio de Registro civil e identificación</p>
      </div>
    </div>
  );
}

function CedulaMrzSection({ lines }: { lines: [string, string, string] }) {
  return (
    <div className="bg-secondary p-4">
      <div className="flex flex-col gap-1 pt-1 font-mono text-xs leading-[1.2] tracking-[0.175px] text-muted-foreground">
        {lines.map((line) => (
          <p key={line} className="break-all">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export function CedulaPreview({ doc }: { doc: CedulaPreviewDoc }) {
  const data = { ...DEFAULT_CEDULA, ...doc };

  return (
    <OfficialDocumentCard>
      <CedulaDocumentHeader />

      <div className="flex items-start gap-3 p-4">
        <DocumentPhotoPlaceholder className="block h-[120px] w-[91px] shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <OfficialDocumentField compact label="Apellidos" value={data.apellidos} />
          <OfficialDocumentField compact label="Nombres" value={data.nombres} />
          <OfficialDocumentField compact label="RUN" value={data.run} />
          <div className="grid grid-cols-2 gap-4">
            <OfficialDocumentField compact label="Fecha nacimiento" value={data.fechaNacimiento} />
            <OfficialDocumentField compact label="Nacionalidad" value={data.nacionalidad} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <OfficialDocumentField compact label="Sexo" value={data.sexo} />
            <OfficialDocumentField emphasis label="Vencimiento" value={data.expiry} />
          </div>
        </div>
      </div>

      <CedulaMrzSection lines={data.mrz} />

      <div className="flex items-center gap-[15px] p-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <OfficialDocumentField compact label="NAC/CAN" value={data.nacCan} />
          <OfficialDocumentField compact label="Nacio en:" value={data.nacioEn} />
          <OfficialDocumentField compact label="Profesión" value={data.profesion} />
        </div>
        <DocumentQrCode />
        <DocumentFingerprintPlaceholder />
      </div>
    </OfficialDocumentCard>
  );
}
