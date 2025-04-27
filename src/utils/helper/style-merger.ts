import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { appConfig } from "../app-config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function loadImgUrlFromBe(url: string | undefined): string {
  return `${appConfig.apiAssetUrl}/storage/v1/object/public/Product/${url}`
}