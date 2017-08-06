import * as express from "express";

declare module Express {
  export interface Session {
    user: number;
  }
}
