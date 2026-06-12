import { NextResponse } from "next/server";

import { TV_STREAMS, RADIO_STATIONS, SMART_TV_APPS } from "@/lib/streams";
import { SITE, SOCIALS, CONTACT } from "@/lib/site";
import { GMI_CHANNELS, GMI_LINKS } from "@/lib/gmiChannels";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// Configuración estable que la app móvil consume al iniciar.
export function GET() {
  return NextResponse.json(
    {
      site: {
        name: SITE.name,
        longName: SITE.longName,
        description: SITE.description,
        founder: SITE.founder,
        hqCity: SITE.hqCity,
      },
      tvStreams: TV_STREAMS,
      radioStations: RADIO_STATIONS,
      smartTvApps: SMART_TV_APPS,
      socials: SOCIALS,
      contact: CONTACT,
      gmiChannels: GMI_CHANNELS,
      gmiLinks: GMI_LINKS,
    },
    { headers: CORS },
  );
}
