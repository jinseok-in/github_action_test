const express = require('express');
const { getUserTargetBudget, 
        updateUserTargetBudget, 
        getUserCapital, 
        getUserDeposit, 
        getUserInstallmentSaving, 
        getUserLoan, 
        getUserStockInfo
    } = require('../controllers/myAssetPlanerController');
const router = express.Router();

router.get('/capital', getUserCapital);
router.get('/target', getUserTargetBudget);
router.put('/target', updateUserTargetBudget);
router.get('/deposit', getUserDeposit);
router.get('/installmentsaving', getUserInstallmentSaving);
router.get('/loan', getUserLoan);
router.get('/stock', getUserStockInfo);

module.exports = router;
