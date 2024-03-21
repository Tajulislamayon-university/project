const router = require("express").Router();
const { formDataController } = require("../controller");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * *Note:  Replace the templateController with your controller
 */

router.post("/create", authMiddleware, formDataController.create);
router.get("/", authMiddleware, formDataController.findAll);
router.get("/:id", authMiddleware, formDataController.find);
router.put("/:id", authMiddleware, formDataController.update);
router.delete("/:id", authMiddleware, formDataController.remove);

module.exports = router;
