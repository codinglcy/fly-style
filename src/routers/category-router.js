import { Router } from "express";

// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { adminRequired } from '../middlewares';
import { categoryService } from "../services";

const categoryRouter = Router();

//카테고리 생성 (login 확인, admin 확인)
categoryRouter.post('/add', loginRequired, adminRequired, async (req, res, next) => {
    try{
        {const name = req.body;

        const newCategory = await categoryService.addCategory(name);

        res.json(newCategory);
        }
    }catch(err){
        next(err);
    }
}); 

//카테고리 수정 (login 확인, admin 확인)
categoryRouter.patch('/edit/:id', loginRequired, adminRequired, async(req, res) => {
    const categoryId = req.params.id;

    const name = req.body;

    const updateData = {
        ...(name && {name}),
    };

    await categoryService.editCategory(categoryId, updateData);

    res.send('카테고리를 수정했습니다.');
}); 

//카테고리 삭제 (login 확인, admin 확인)
categoryRouter.delete('/:id', loginRequired, adminRequired, async(req, res) => {
    const categoryId = req.params.id;

    await categoryService.deleteProduct(categoryId);
    // res.send(`카테고리를 삭제했습니다.`);
    res.redirect('/');
});


export { categoryRouter };
