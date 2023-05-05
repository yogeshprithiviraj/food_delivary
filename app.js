var http = require('http');
const url=require('url')
const express = require('express');
const pool = require("./dbconnection")
const bodyParser = require('body-parser');
const { nextTick } = require('process');
//const { response } = require('express');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use((req,res)=>{
//     res.json({ message: 'Hey! This is your server response!' });
// })

//-----------------restarent api---------------

// app.get("/restaurant", (request, response) => {
//     pool.query('SELECT * FROM gr.restaurant', (error, results) => {
//         if (error) {
//           throw error
//         }
//         response.status(200).json(results.rows)
//       })
   
//   });
  // TODO:query string- localhost:3000/restranet/1

  app.get("/restaurant/:res_id", (request, response) => {
    // TODO:
    const { res_id } = request.params;
    console.log(res_id);
   
    pool.query('SELECT * FROM gr.restaurant where res_id= $1',[res_id] ,(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
     
  });

  // TODO:url param - localhost:3000/restranet?id=1
  app.get("/restaurant", (request, response) => {
    // TODO:
    const { res_id } = request.query;
    //console.log("res_id",res_id)
    pool.query('SELECT * FROM gr.restaurant where res_id= $1',[res_id] ,(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    // response.status(200).json({})
  });
  
  app.post("/restaurant",(request,response)=>{
    const {res } = request.body
   pool.query(
    'INSERT INTO gr.restaurant(res_name) VALUES ($1)',
    [res],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'restarent added.' })
    }
  )
  })

  app.delete("/restaurant",(request,response)=>{
    const {res_name} = request.body
    pool.query(
    'delete from gr.restaurant where res_name=$1',
    [res_name],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'restarent deleted.' })
    }
  )
  })
  app.put("/restaurant",(request,response)=>{
    const {res_id,res_name} = request.body
  pool.query(
    'UPDATE gr.restaurant set res_name=$2 where res_id= $1',
    [res_id,res_name],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'restarent update' })
    }
  )
  })


  //-------main menu---------------
  //url params
  app.get("/restaurant/main_menu", (request, response) => {
    // TODO:
    const { id } = request.query;
    pool.query('select * from gr.main_menu where res_id=$1',[id] ,(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
   
  });
//query string 
  app.get("/restaurant/main_menu/:res_id", (request, response) => {
    // TODO:
    const { res_id } = request.params;
    pool.query('SELECT * FROM gr.main_menu where res_id=$1',[res_id] ,(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
   
  });

  app.post("/restaurant/main_menu",(request,response)=>{
    const {menu } = request.body;
    const{res}=request.body;
   pool.query(
    'INSERT INTO gr.main_menu(menu_name,res_id) VALUES ($1,$2)',
    [menu,res],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'main menu added with related restarant' })
    }
  )
  })

  app.delete("/restaurant/main_menu/:id",(request,response)=>{
    const {id} = request.params
    pool.query(
    'delete from gr.main_menu where mainmenu_id=$1',
    [id],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'menu was deleted' })
    }
  )
  })
  app.put("/restaurant/main_menu",(request,response)=>{
    const {id,name} = request.body
  pool.query(
    'UPDATE gr.main_menu set menu_name=$2 where mainmenu_id= $1',
    [id,name],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'menu update successfully' })
    }
  )
  })
//------------menu catagory---------------------
  app.get("/restaurant/main_menu/menu_category/:id", (request, response) => {
    // TODO:
    const { id } = request.params;
    pool.query('select * from gr.menu_category where mainmenu_id=$1',[id] ,(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
   
  });

  app.post("/restaurant/main_menu/menu_category/",(request,response)=>{
    const {menu } = request.body;
    const{cat}=request.body;
   pool.query(
    'INSERT INTO gr.menu_category(name,mainmenu_id) VALUES ($2,$1)',
    [menu,cat],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'new menu category added to the menu ' })
    }
  )
  })
//TODO
  app.delete("/restaurant/main_menu/menu_category/:id",(request,response)=>{
    const {id,fk} = request.params
    pool.query(
    'delete from gr.menu_category where menu_category_id=$1 && mainmenu_id=$2',
    [id,fk],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'menu category was deleted' })
    }
  )
  })
  app.put("/restaurant/main_menu/menu_category/",(request,response)=>{
    const {id,name} = request.body
  pool.query(
    'UPDATE gr.menu_category set name=$2 where menu_category_id= $1',
    [id,name],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'menu category update successfully' })
    }
  )
  })


  //----------------master menu------------------
  app.get("/restaurant/main_menu/menu_category/master_item/:id", (request, response) => {
    // TODO:
    const { id } = request.params;
    pool.query('select * from gr.master_item where res_id=$1',[id] ,(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
   
  });

  app.post("/restaurant/main_menu/menu_category/master_item",(request,response)=>{
    const {id,name,price } = request.body;
    
   pool.query(
    'INSERT INTO gr.master_item(res_id,item_name,price) VALUES ($1,$2,$3)',
    [id,name,price],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'master item updated ' })
    }
  )
  })
//TODO
  app.delete("/restaurant/main_menu/menu_category/master_item/:id",(request,response)=>{
    const {id} = request.params
    pool.query(
    'delete from gr.master_item where menu_item_id=$1 ',
    [id],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'menu item was deleted' })
    }
  )
  })
  app.put("/restaurant/main_menu/menu_category/master_item",(request,response)=>{
    const {id,price} = request.body
  pool.query(
    'UPDATE gr.master_item set price=$2 where menu_item_id= $1',
    [id,price],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'master item updated' })
    }
  )
  })
  //--------------menu_item----------------------------------

  app.get("/restaurant/main_menu/menu_category/master_item/menu_item/:id", (request, response) => {
    // TODO:
    const { id } = request.params;
    pool.query('select res_name,item_name,price from gr.restaurant as a right join gr.main_menu as b on a.res_id=b.res_id right join gr.menu_category as c on b.mainmenu_id=c.mainmenu_id right join gr.menu_item as d on c.menu_category_id=d.menu_category_id right join gr.master_item as e on d.menu_item_id=e.menu_item_id where item_id=$1',[id] ,(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
   
  });
//-------------------------------------
  // app.get("/restaurant/:id", (request, response) => {
  //   // TODO:
  //   const { id } = request.params;
  //   pool.query('select res_name,item_name,price from gr.restaurant as a right join gr.main_menu as b on a.res_id=b.res_id right join gr.menu_category as c on b.mainmenu_id=c.mainmenu_id right join gr.menu_item as d on c.menu_category_id=d.menu_category_id right join gr.master_item as e on d.menu_item_id=e.menu_item_id where item_id=$1',[id] ,(error, results) => {
  //       if (error) {
  //         throw error
  //       }
  //       response.status(200).json(results.rows)
  //     })
   
  // });

  //------------------------------------
  app.get("/restaurant/:id/q", (request, response) => {
    // TODO:
    const { id } = request.params;
    const{ismenu}=request.query.ismenu;
    console.log(ismenu);
    pool.query('select * from gr.restaurant as a right join gr.main_menu as b on a.res_id=b.res_id right join gr.menu_category as c on b.mainmenu_id=c.mainmenu_id right join gr.menu_item as d on c.menu_category_id=d.menu_category_id right join gr.master_item as e on d.menu_item_id=e.menu_item_id where res_id=$1',[id] ,(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      console.log("ismenu"+ismenu);
      if(ismenu==true){
        pool.query('select menu_name from gr.restaurant as a right join gr.main_menu as b on a.res_id=b.res_id right join gr.menu_category as c on b.mainmenu_id=c.mainmenu_id right join gr.menu_item as d on c.menu_category_id=d.menu_category_id right join gr.master_item as e on d.menu_item_id=e.menu_item_id where res_id=$1',[id] ,(error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
  
      }
   
  });
  







  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening`)
  })