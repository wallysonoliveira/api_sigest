import { Router } from 'express';
import { get_ICMS_IPM_controller,  getFiltered_ICMS_IPM_controller } from '../controllers/icms_ipm_controller';

const router = Router();

router.get('/icms-ipm', get_ICMS_IPM_controller);
router.get('/icms-ipm-filtered', getFiltered_ICMS_IPM_controller);

export { router };
