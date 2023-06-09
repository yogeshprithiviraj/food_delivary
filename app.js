var http = require('http');
const url = require('url')
const express = require('express');
const pool = require("./dbconnection")
const bodyParser = require('body-parser');
const { nextTick } = require('process');
var _ = require('lodash');
const { result } = require('lodash');
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

  pool.query('SELECT * FROM gr.restaurant where res_id= $1', [res_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)//
  })

});

// TODO:url param - localhost:3000/restranet?id=1
app.get("/restaurant", (request, response) => {
  // TODO:
  const { res_id } = request.query;
  //console.log("res_id",res_id)
  pool.query('SELECT * FROM gr.restaurant where res_id= $1', [res_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
  // response.status(200).json({})
});

app.post("/restaurant", (request, response) => {
  const { res } = request.body
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

app.delete("/restaurant", (request, response) => {
  const { res_name } = request.body
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
app.put("/restaurant", (request, response) => {
  const { res_id, res_name } = request.body
  pool.query(
    'UPDATE gr.restaurant set res_name=$2 where res_id= $1',
    [res_id, res_name],
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
  pool.query('select * from gr.main_menu where res_id=$1', [id], (error, results) => {
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
  pool.query('SELECT * FROM gr.main_menu where res_id=$1', [res_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

});

app.post("/restaurant/main_menu", (request, response) => {
  const { menu } = request.body;
  const { res } = request.body;
  pool.query(
    'INSERT INTO gr.main_menu(menu_name,res_id) VALUES ($1,$2)',
    [menu, res],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'main menu added with related restarant' })
    }
  )
})

app.delete("/restaurant/main_menu/:id", (request, response) => {
  const { id } = request.params
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
app.put("/restaurant/main_menu", (request, response) => {
  const { id, name } = request.body
  pool.query(
    'UPDATE gr.main_menu set menu_name=$2 where mainmenu_id= $1',
    [id, name],
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
  pool.query('select * from gr.menu_category where mainmenu_id=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

});

app.post("/restaurant/main_menu/menu_category/", (request, response) => {
  const { menu } = request.body;
  const { cat } = request.body;
  pool.query(
    'INSERT INTO gr.menu_category(name,mainmenu_id) VALUES ($2,$1)',
    [menu, cat],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'new menu category added to the menu ' })
    }
  )
})
//TODO
app.delete("/restaurant/main_menu/menu_category/:id", (request, response) => {
  const { id, fk } = request.params
  pool.query(
    'delete from gr.menu_category where menu_category_id=$1 && mainmenu_id=$2',
    [id, fk],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'menu category was deleted' })
    }
  )
})
app.put("/restaurant/main_menu/menu_category/", (request, response) => {
  const { id, name } = request.body
  pool.query(
    'UPDATE gr.menu_category set name=$2 where menu_category_id= $1',
    [id, name],
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
  pool.query('select * from gr.master_item where res_id=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

});

app.post("/restaurant/main_menu/menu_category/master_item", (request, response) => {
  const { id, name, price } = request.body;

  pool.query(
    'INSERT INTO gr.master_item(res_id,item_name,price) VALUES ($1,$2,$3)',
    [id, name, price],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'master item updated ' })
    }
  )
})
//TODO
app.delete("/restaurant/main_menu/menu_category/master_item/:id", (request, response) => {
  const { id } = request.params
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
app.put("/restaurant/main_menu/menu_category/master_item", (request, response) => {
  const { id, price } = request.body
  pool.query(
    'UPDATE gr.master_item set price=$2 where menu_item_id= $1',
    [id, price],
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
  pool.query('select res_name,item_name,price from gr.restaurant as a right join gr.main_menu as b on a.res_id=b.res_id right join gr.menu_category as c on b.mainmenu_id=c.mainmenu_id right join gr.menu_item as d on c.menu_category_id=d.menu_category_id right join gr.master_item as e on d.menu_item_id=e.menu_item_id where item_id=$1', [id], (error, results) => {
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
app.get("/restaurant1/:id", (request, response) => {
  // TODO:
  const { id } = request.params;

  const { ismenu } = request.query;
  //console.log(ismenu);
  let query = 'select * from gr.restaurant';
  let querybinding = [];
  //console.log(id+" "+ismenu)
  if (ismenu === 'true') {
    query = `select  res_name,menu_name 
    from gr.restaurant as a 
    inner join gr.main_menu as b on a.res_id=b.res_id
    where b.res_id=$1;`;
    querybinding = [id];
    //console.log(id)
  }

  pool.query(query, querybinding, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
});

app.get("/restaurant1/:id/:cat", (request, response) => {
  // TODO:
  const { id, cat } = request.params;
  const { iscat } = request.query;
  //console.log(ismenu);
  let query = `select  res_name,menu_name 
  from gr.restaurant as a 
  inner join gr.main_menu as b 
  on a.res_id=b.res_id where b.res_id= $1;`;
  let querybinding = [id];
  //console.log(id+" "+ismenu)
  if (iscat === 'true') {
    query = `select res_name,menu_name,name 
    from gr.restaurant as a 
    inner join gr.main_menu as b on a.res_id=b.res_id 
    inner join gr.menu_category as c on b.mainmenu_id=c.mainmenu_id 
    where a.res_id =$1 and b.mainmenu_id = $2;`;
    querybinding = [id, cat];
    console.log(id)
  }

  pool.query(query, querybinding, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

});
///==============================
app.get("/restaurant1/:id/:cat/:menu", (request, response) => {
  // TODO:
  const { id, cat, menu } = request.params;
  const { ismenu } = request.query;
  //console.log(ismenu);
  let query = `select 
  res_name,menu_name,name as catname 
  from gr.restaurant as a 
  inner join gr.main_menu as b on a.res_id=b.res_id 
  inner join gr.menu_category as c on b.mainmenu_id=c.mainmenu_id 
  where a.res_id =$1 
  and b.mainmenu_id = $2;`;
  let querybinding = [id, cat];
  //console.log(id+" "+ismenu)
  if (ismenu === 'true') {
    query = `select 
    res_name,menu_name,name,item_name,price 
    from gr.restaurant as a 
     join gr.main_menu as b on a.res_id=b.res_id 
     join gr.menu_category as c on b.mainmenu_id=c.mainmenu_id 
     join gr.menu_item as d on c.menu_category_id=d.menu_category_id 
     join gr.master_item as e on d.menu_item_id=e.menu_item_id 
    where 
    a.res_id=$1 
    and b.mainmenu_id=$2 
    and c.menu_category_id =$3;`;
    querybinding = [id, cat, menu];
    console.log(id)
  }

  pool.query(query, querybinding, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

});



app.get("/restaurant2", (request, response) => {
  // http:localhost:3000/restaurant2?restaurant_all_mainmenu=1&mainmenu_all_category=1&category_all_dishes=1
  ;
  const { restaurant_all_mainmenu, mainmenu_all_category, category_all_dishes } = request.query;
  //console.log(ismenu);
  let query = `select * from gr.restaurant`;
  let querybinding = [];
  //console.log(id+" "+ismenu)
  if (restaurant_all_mainmenu != null) {
    query = `select a.res_id,res_name,menu_name 
    from gr.restaurant as a 
    inner join gr.main_menu as b 
    on a.res_id=b.res_id where b.res_id= $1`;
    querybinding = [restaurant_all_mainmenu];
    if (mainmenu_all_category != null) {
      query = `select res_name,menu_name,name 
      from gr.restaurant as a 
      inner join gr.main_menu as b on a.res_id=b.res_id 
      inner join gr.menu_category as c on b.mainmenu_id=c.mainmenu_id 
      where a.res_id =$1 and b.mainmenu_id = $2`;
      querybinding = [restaurant_all_mainmenu, mainmenu_all_category]
      if (category_all_dishes != null) {
        query = `select 
      res_name,menu_name,name,item_name,price 
      from gr.restaurant as a 
       join gr.main_menu as b on a.res_id=b.res_id 
       join gr.menu_category as c on b.mainmenu_id=c.mainmenu_id 
       join gr.menu_item as d on c.menu_category_id=d.menu_category_id 
       join gr.master_item as e on d.menu_item_id=e.menu_item_id 
      where 
      a.res_id=$1 
      and b.mainmenu_id=$2 
      and c.menu_category_id =$3`;
        querybinding = [restaurant_all_mainmenu, mainmenu_all_category, category_all_dishes]
      }
    }


  }
  pool.query(query, querybinding, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})


app.get("/restaurant44/:id", (request,response) => {
  // TODO:
  const { id } = request.params;

  //console.log(ismenu);
  //let query = 'select * from gr.restaurant';

  pool.query(`select *
    from gr.restaurant as a inner join gr.main_menu as b on a.res_id=b.res_id
    inner join gr.menu_category as c on c.mainmenu_id=b.mainmenu_id
     inner join gr.menu_item as d on c.menu_category_id=d.menu_category_id
     inner join gr.master_item as e on d.menu_item_id=e.menu_item_id where a.res_id=$1
    `,[id], (error, results) => {

    if (error) {
      throw error
    }else{
    response.status(200).json(results.rows)
    }
    let menu=[];
    let req_id=("$1",[id])
    console.log(req_id)
    if(results.rows.res_id === req_id)
      {
        menu.push(ele.menu_name)
      }
      console.log(menu)
    // console.log(results.rows)
    // let menu = [];
    // let menu_items = [];
    // let obj = {};
    // results.rows.map((ele)=>{
    //   if(ele.menu_name === "breakfast"){
    //     menu_items.push(ele.name);
    //     obj[ele.menu_name] = menu_items
    //   }
    //   menu.push(obj);
    //   menu = _.uniqBy(menu,"breakfast");
      
    // })
    // console.log("menu",menu)
  })
});

//----------------------------------------
app.get("/restaurant77/:id", (request,response) => {
  // TODO:
  const { id } = request.params;

  //console.log(ismenu);
  //let query = 'select * from gr.restaurant';

 const var1 = pool.query(`select *
    from gr.restaurant as a inner join gr.main_menu as b on a.res_id=b.res_id
    inner join gr.menu_category as c on c.mainmenu_id=b.mainmenu_id
     inner join gr.menu_item as d on c.menu_category_id=d.menu_category_id
     inner join gr.master_item as e on d.menu_item_id=e.menu_item_id where a.res_id=$1
    `,[id], (error, results) => {

    if (error) {
      throw error
    }else{
     response.status(200).json(results.rows)
    }
    
  })
  console.log(var1)
});


//-----------------------
app.get("/restaurant344/", (request, response) => {
  // TODO:
  //const { res_id } = request.params;
 // console.log(res_id);

  pool.query(`select row_to_json(r1.*)
  from(
  select t1.res_id,t1.res_name
  ,array(
  select row_to_json(r2.*)
  from(
  select t2.mainmenu_id,t2.menu_name,array(select row_to_json(r3.*) from 
  (
  select t3.menu_category_id,t3.name,array(
  select row_to_json(r4.*)from 
  (
  select t4.item_id,t4.menu_category_id, array(
  select row_to_json(r5.*,true) from (
  select * from gr.master_item  t5 
  where t5.menu_item_id=t4.menu_item_id
  order by t5.menu_item_id)r5
  )menu_detials
  from gr.menu_item t4
  where t4.menu_category_id=t3.menu_category_id
  order by t4.item_id)r4
  )
  from gr.menu_category t3
  where t3.mainmenu_id=t2.mainmenu_id
  order by t3.menu_category_id)r3
  )menu_catogory
  from gr.main_menu t2
  where t2.res_id=t1.res_id
  order by t2.mainmenu_id)r2) main_menu
  from gr.restaurant t1) r1`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)//
  })

});


//-------------------particular restarent-------------------
app.get("/restaurant344/:res_id", (request, response) => {
  // TODO:
  const { res_id } = request.params;
 // console.log(res_id);

  pool.query(`select row_to_json(r1.*)
  from(select t1.res_name,array
          (select row_to_json(r2.*)
          from(select t2.menu_name, array
              (select row_to_json(r3.*) 
              from(select t3.name,array
                  (select row_to_json(r4.*)
                  from(select array
                      (select row_to_json(r5.*, true) 
                      from(
                          select t5.menu_item_id as Item_no,t5.item_name,t5.price from gr.master_item  t5 
                          where t5.menu_item_id = t4.menu_item_id
                          order by t5.menu_item_id
                          )r5
                      )menu_details
                      from gr.menu_item t4
                      where t4.menu_category_id = t3.menu_category_id
                      order by t4.item_id
                      )r4
                  )
                  from gr.menu_category t3
                  where t3.mainmenu_id = t2.mainmenu_id
                  order by t3.menu_category_id
                  )r3
              )menu_catogory
              from gr.main_menu t2
              where t2.res_id = t1.res_id
              order by t2.mainmenu_id
              )r2
          ) main_menu
          from gr.restaurant t1
           where t1.res_id = $1
      ) r1
  `,[res_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)//
  })

});





app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening`)
})