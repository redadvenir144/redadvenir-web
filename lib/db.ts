// Capa de datos conmutable:
//   • LOCAL (sin credenciales de Redis): archivo data/db.json. Cero configuración.
//   • NUBE (Vercel + Upstash Redis): almacenamiento serverless de solo-escritura.
//
// Se elige automáticamente según las variables de entorno. El contenido se
// gestiona desde el admin (/admin). Los archivos subidos (imágenes/PDF) van a
// public/uploads en local o a Vercel Blob en producción (ver upload route).

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Redis } from "@upstash/redis";

import {
  SEED_BELIEFS,
  SEED_FAQS,
  SEED_POSTS,
  SEED_PROGRAMS,
  SEED_SCHEDULE,
  SEED_STUDIES,
} from "./seed";

export type Collection =
  | "posts"
  | "programs"
  | "schedule"
  | "studies"
  | "beliefs"
  | "faqs";

type Row = Record<string, unknown> & { _id: string };

// --- Selección de backend ---------------------------------------------------

const REDIS_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const redis =
  REDIS_URL && REDIS_TOKEN
    ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN })
    : null;

export const usingCloudDb = redis !== null;

const SEEDS: Record<Collection, Row[]> = {
  posts: SEED_POSTS as unknown as Row[],
  programs: SEED_PROGRAMS as unknown as Row[],
  schedule: SEED_SCHEDULE as unknown as Row[],
  studies: SEED_STUDIES as unknown as Row[],
  beliefs: SEED_BELIEFS as unknown as Row[],
  faqs: SEED_FAQS as unknown as Row[],
};

function seedFor(col: Collection): Row[] {
  return JSON.parse(JSON.stringify(SEEDS[col]));
}

// --- Backend archivo local --------------------------------------------------

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
let writeChain: Promise<void> = Promise.resolve();

async function fileReadAll(): Promise<Record<Collection, Row[]>> {
  try {
    return JSON.parse(await fs.readFile(DB_FILE, "utf8"));
  } catch {
    const data = {
      posts: seedFor("posts"),
      programs: seedFor("programs"),
      schedule: seedFor("schedule"),
      studies: seedFor("studies"),
      beliefs: seedFor("beliefs"),
      faqs: seedFor("faqs"),
    };
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf8");
    } catch {
      // Sistema de archivos de solo lectura (serverless sin Redis configurado):
      // usar el contenido de ejemplo en memoria para no romper el sitio.
    }
    return data;
  }
}

async function fileWriteAll(data: Record<Collection, Row[]>): Promise<void> {
  writeChain = writeChain.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  });
  return writeChain;
}

// --- API de colección (independiente del backend) ---------------------------

const key = (col: Collection) => `ra:${col}`;

async function readCol(col: Collection): Promise<Row[]> {
  if (redis) {
    const data = await redis.get<Row[]>(key(col));
    if (data == null) {
      const seed = seedFor(col);
      await redis.set(key(col), seed);
      return seed;
    }
    return data;
  }
  const db = await fileReadAll();
  return db[col] ?? [];
}

async function writeCol(col: Collection, rows: Row[]): Promise<void> {
  if (redis) {
    await redis.set(key(col), rows);
    return;
  }
  const db = await fileReadAll();
  db[col] = rows;
  await fileWriteAll(db);
}

// --- Operaciones públicas ---------------------------------------------------

export async function list<T = Record<string, unknown>>(
  col: Collection,
): Promise<T[]> {
  return (await readCol(col)) as unknown as T[];
}

export async function get<T = Record<string, unknown>>(
  col: Collection,
  id: string,
): Promise<T | null> {
  const rows = await readCol(col);
  return (rows.find((x) => x._id === id) as T) ?? null;
}

export async function create(
  col: Collection,
  data: Record<string, unknown>,
): Promise<Row> {
  const rows = await readCol(col);
  const item: Row = { ...data, _id: randomUUID() };
  await writeCol(col, [...rows, item]);
  return item;
}

export async function update(
  col: Collection,
  id: string,
  data: Record<string, unknown>,
): Promise<Row | null> {
  const rows = await readCol(col);
  let updated: Row | null = null;
  const next = rows.map((x) => {
    if (x._id === id) {
      updated = { ...x, ...data, _id: id };
      return updated;
    }
    return x;
  });
  if (updated) await writeCol(col, next);
  return updated;
}

export async function remove(col: Collection, id: string): Promise<boolean> {
  const rows = await readCol(col);
  const next = rows.filter((x) => x._id !== id);
  const changed = next.length !== rows.length;
  if (changed) await writeCol(col, next);
  return changed;
}
