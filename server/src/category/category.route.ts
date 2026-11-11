import Router from "express";
import { categorySuggestionsController, createCategoryController, deleteCategoryByController, getCategoriesController, getCategoryByIdController, updateCategoryByController } from "./category.controller";

const router = Router()

router
.post("/create-category", createCategoryController)
    .get("/get-categories", getCategoriesController)
     .get("/suggestions", categorySuggestionsController)
    .get("/:id", getCategoryByIdController)
    .patch("/:id/update", updateCategoryByController)
    .patch("/:id/delete", deleteCategoryByController)

    export default router