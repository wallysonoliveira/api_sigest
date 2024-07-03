import { Request, Response } from 'express';
import { getAll_ICMS_IPM, getFiltered_ICMS_IPM } from '../services/icms_ipm_service';

export const get_ICMS_IPM_controller = async (req: Request, res: Response) => {
  try {
    const icms_ipm = await getAll_ICMS_IPM();
    res.json(icms_ipm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch icms_ipm' });
    console.error('Failed to fetch icms_ipm:', error);
  }
};

export const getFiltered_ICMS_IPM_controller = async (req: Request, res: Response) => {
  try {
    const { ano, municipio, provisorio_definitivo } = req.body;

    const filters = {
      ano: ano ? Number(ano) : undefined,
      municipio: municipio ? String(municipio) : undefined,
      provisorio_definitivo: provisorio_definitivo ? String(provisorio_definitivo) : undefined,
    };

    const icms_ipm = await getFiltered_ICMS_IPM(filters);
    res.json(icms_ipm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ICMS/IPM data' });
    console.error('Failed to fetch ICMS/IPM data:', error);
  }
};
