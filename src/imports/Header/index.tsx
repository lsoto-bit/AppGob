import svgPaths from "./svg-9x7qwz06rf";

function Logo1() {
  return (
    <div className="absolute inset-[0_0.14%_1.66%_0]" data-name="Logo">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 143.174 23.6025">
        <g id="Logo">
          <g id="Logo_2">
            <path d={svgPaths.p35edc680} fill="var(--fill-0, #557EBF)" id="Vector" />
          </g>
          <g id="Logo_3">
            <path d={svgPaths.p151d800} fill="var(--fill-0, #557EBF)" id="Vector_2" />
          </g>
          <g id="Logo_4">
            <path d={svgPaths.p234d0400} fill="var(--fill-0, #557EBF)" id="Vector_3" />
          </g>
          <g id="Logo_5">
            <path d={svgPaths.p29e28e00} fill="var(--fill-0, #557EBF)" id="Vector_4" />
          </g>
          <g id="Logo_6">
            <path d={svgPaths.p383d8980} fill="var(--fill-0, #305BAA)" id="Vector_5" />
          </g>
          <g id="Logo_7">
            <path d={svgPaths.p11d1fe60} fill="var(--fill-0, #305BAA)" id="Vector_6" />
          </g>
          <g id="Logo_8">
            <path d={svgPaths.p159fb380} fill="var(--fill-0, #305BAA)" id="Vector_7" />
          </g>
          <g id="Logo_9">
            <path d={svgPaths.p1165f200} fill="var(--fill-0, #305BAA)" id="Vector_8" />
          </g>
          <g id="Logo_10">
            <path d={svgPaths.p37053e00} fill="var(--fill-0, #557EBF)" id="Vector_9" />
          </g>
          <g id="Logo_11">
            <path d={svgPaths.p20cd2400} fill="var(--fill-0, #305BAA)" id="Vector_10" />
            <path d={svgPaths.p3df6f380} fill="var(--fill-0, #305BAA)" id="Vector_11" />
            <path d={svgPaths.p2d3b5600} fill="var(--fill-0, #305BAA)" id="Vector_12" />
          </g>
          <g id="Logo_12">
            <path d={svgPaths.p21327200} fill="var(--fill-0, #305BAA)" id="Vector_13" />
          </g>
          <path d={svgPaths.p303fde80} fill="var(--fill-0, #557EBF)" id="Vector_14" />
        </g>
      </svg>
    </div>
  );
}

function ClaveUnica() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-[143.368px]" data-name="ClaveÚnica">
      <Logo1 />
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[203px]" data-name="Logo">
      <div className="h-[8px] relative shrink-0 w-[100px]" data-name="Logotipos / Franja">
        <div className="absolute inset-[0_0_0_37.27%]" data-name="Fill 10">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62.7273 8">
            <path clipRule="evenodd" d="M0 8H62.7273V0H0V8Z" fill="var(--fill-0, #FF2930)" fillRule="evenodd" id="Fill 10" />
          </svg>
        </div>
        <div className="absolute inset-[0_62.73%_0_0]" data-name="Fill 11">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.2727 8">
            <path clipRule="evenodd" d="M0 8H37.2727V0H0V8Z" fill="var(--fill-0, #0F5AC4)" fillRule="evenodd" id="Fill 11" />
          </svg>
        </div>
      </div>
      <ClaveUnica />
    </div>
  );
}

export default function Header() {
  return (
    <div className="content-stretch flex items-end pb-[16px] relative size-full" data-name="header">
      <Logo />
    </div>
  );
}