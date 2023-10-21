import express from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log:['query'],
    
});

export default prisma;