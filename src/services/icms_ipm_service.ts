import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ICMSIPMFilters {
  ano?: number;
  municipio?: string;
  provisorio_definitivo?: string;
}

export const getAll_ICMS_IPM = async () => {
  return prisma.icms_ipm.findMany();
};

export const getFiltered_ICMS_IPM = async (filters: ICMSIPMFilters) => {
  const { ano, municipio, provisorio_definitivo } = filters;
  return prisma.icms_ipm.findMany({
    where: {
      ano,
      municipio,
      provisorio_definitivo,
    },
  });
};