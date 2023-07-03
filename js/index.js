// Тут будет писаться основной код
// Не пугайтесь этой штуки import
import { brands, products } from './data.js';

let right_center = document.querySelector('main .right_center')
let count_cart = document.querySelector('header .cart_icon span')
let cart_icon = document.querySelector('.cart_icon')
let payment_page = document.querySelector('.payment_page')
let header = document.querySelector('header')
let main_home_page = document.querySelector('.home-page')
let header_bt_img = document.querySelector('.header_bt_img')
let footer = document.querySelector('footer')
let rightSide = document.querySelector('.payment_page .right_side')
let close = document.querySelector('.modal-page-cart .buttons .close')
let screen_products = document.querySelector('.screen_products')
let bg_blur = document.querySelector('.bg_blur')
let totalCost = document.querySelector('.subheading .cost span')
let input_rng = document.querySelector('#range')
let input_span = document.querySelector('#range_span')
let categories = document.querySelector('.categorys')
let dark_mode = document.querySelector('.dark')
let light_mode = document.querySelector('.light')
let body = document.querySelector('body')

let cart = []
let sorted_brands = []
let sortBrand_price = []
let total_cost = 0
let sorted2 = 0

input_rng.onchange = () => {
    sorted2 = +event.target.value
    input_span.innerText = sorted2 + '$'
}

for (let item of brands) {
    let name_catg = document.createElement('a')
    name_catg.classList.add('name_brands')
    categories.append(name_catg)
    name_catg.innerText = item.name

    name_catg.setAttribute('id', item.id)
    name_catg.onclick = () => {
        name_catg.classList.toggle('ctg_active')
        if (sorted_brands.filter(el => el == item.id)[0]) {
            sorted_brands.splice(sorted_brands.indexOf(sorted_brands.filter(el => el == item.id)[0]), 1)
            console.log('Удалено')
        } else {
            sorted_brands.push(item.id)
            console.log('Добавлено')
        }
        console.log(sorted_brands)

        if (body.classList.contains('dark_body')) {
            name_catg.classList.remove('name_brands')
            name_catg.classList.remove('ctg_active')
            name_catg.classList.toggle('ctg_active_dark')
        } else {
            name_catg.classList.add('name_brands')
            name_catg.classList.remove('ctg_active_dark')
        }
    }
}

let reload = (arr) => {
    right_center.innerHTML = ''

    for (let item of arr) {
        let items = document.createElement('div')
        items.classList.add('item')
        let img_div = document.createElement('div')
        img_div.classList.add('img')
        let img_one = document.createElement('img')
        img_one.classList.add('img_one')
        let a = document.createElement('a')
        a.href = '#'
        let p = document.createElement('p')
        p.classList.add('t')
        let btns_div = document.createElement('div')
        btns_div.classList.add('btns_div')

        let addCart = document.createElement('button')
        addCart.classList.add('btn_cart')
        addCart.setAttribute('id', item.id)
        addCart.innerText = 'Add to cart'
        btns_div.append(addCart)

        let delete_cart = document.createElement('button')
        delete_cart.classList.add('delete_cart')
        delete_cart.setAttribute('id', item.id)
        delete_cart.innerText = 'Remove from cart'
        btns_div.append(delete_cart)



        let orders_id = Math.random().toString().slice(2, 10)
        let orders = document.createElement('div')
        orders.classList.add('orders')
        orders.setAttribute('id', orders_id)

        addCart.onclick = () => {
            orders.innerHTML = ''
            addCart.style.display = 'none'
            delete_cart.style.display = 'block'

            let id = event.target.getAttribute('id')
            cart.push(addCart.getAttribute('id'))
            count_cart.innerText = cart.length

            if (id == item.id) {
                let img = document.createElement('img')
                let p = document.createElement('p')
                let product_tool = document.createElement('div')
                product_tool.classList.add('product_tool')
                let subtract = document.createElement('div')
                subtract.classList.add('subtract')
                let indicate = document.createElement('div')
                indicate.classList.add('indicate')
                let add = document.createElement('div')
                add.classList.add('add')
                let h4 = document.createElement('h4')

                product_tool.append(subtract, indicate, add)
                orders.append(img, p, product_tool, h4)
                rightSide.append(orders)
                orders.style.display = 'flex'

                let j = 0
                j++

                img.src = 'images/products/' + item.image
                p.innerText = item.name
                h4.innerText = item.price
                subtract.innerText = '-'
                indicate.innerText = j
                add.innerText = '+'

                subtract.onclick = () => {
                    j--
                    indicate.innerText = j
                    if (j <= 0) {
                        orders.style.display = 'none'
                        delete_cart.style.display = 'none'
                        addCart.style.display = 'block'
                        let find = cart.filter(item => item == id)[0]
                        cart.splice(cart.indexOf(find), 1)
                    }

                    let sum = j * item.price
                    h4.innerText = sum
                    total_cost -= item.price

                    if (total_cost >= 0) {
                        totalCost.innerText = total_cost
                    } else {
                        return false
                    }
                    count_cart.innerText = cart.length
                }

                add.onclick = () => {
                    j++
                    indicate.innerText = j

                    let sum = j * item.price
                    h4.innerText = sum

                    total_cost += item.price
                    totalCost.innerText = total_cost
                }
                total_cost += item.price
                totalCost.innerText = total_cost
            }
        }

        delete_cart.onclick = () => {
            addCart.style.display = 'block'
            delete_cart.style.display = 'none'

            let id = event.target.getAttribute('id')
            let find = cart.filter(item => item == id)[0]
            cart.splice(cart.indexOf(find), 1)
            count_cart.innerText = cart.length
            console.log(cart)

            let j = 0
            j--

            total_cost -= orders.children[3].innerText

            if (total_cost >= 0) {
                totalCost.innerText = total_cost
            } else {
                return false
            }

            if (orders.getAttribute('id') == orders_id) {
                orders.style.display = 'none'
                totalCost.innerText = total_cost
            }

        }

        img_div.append(img_one)
        items.append(img_div, a, p, btns_div)
        right_center.append(items)

        img_one.src = 'images/products/' + item.image
        a.innerText = item.name
        p.innerText = item.price + '$'

        if (orders.getAttribute('id') == orders_id) {
            a.onclick = () => {
                product_page()
            }
        }
        let product_page = () => {

            let wrapper = document.createElement('div')
            wrapper.classList.add('wrapper')
            screen_products.append(wrapper)

            //close_page
            let close_page = document.createElement('h3')
            close_page.classList.add('close_page')
            close_page.innerText = '+'

            //left_side elements
            let sides = document.createElement('div')
            sides.classList.add('sides')
            wrapper.append(close_page, sides)

            let left_side = document.createElement('div')
            left_side.classList.add('left_side')
            sides.append(left_side)

            let links = document.createElement('div')
            links.classList.add('links')
            left_side.append(links)

            let content_a = ['Home |', 'Catalog |', 'All |', item.name]
            for (let item of content_a) {
                let a_links = document.createElement('a')
                a_links.href = '#'
                a_links.innerText = item

                links.append(a_links)
            }
            links.lastElementChild.classList.add('active')


            let leftSide_img = document.createElement('img')
            leftSide_img.src = 'images/products/' + item.image
            left_side.append(leftSide_img)

            let more_img = document.createElement('div')
            more_img.classList.add('more_img')
            left_side.append(more_img)

            for (let i = 0; i < 3; i++) {
                let img = document.createElement('img')
                img.src = 'images/products/' + item.image
                more_img.append(img)
            }

            //right_side elements
            let right_side = document.createElement('div')
            right_side.classList.add('right_side')
            sides.append(right_side)

            let right_side_classList = ['product_details', 'color_options', 'product_quantity', 'product_distribution']
            for (let context of right_side_classList) {
                let divs = document.createElement('div')
                divs.classList.add(context)
                right_side.append(divs)
            }

            let product_details = ['heading', 'price_info']
            for (let context of product_details) {
                let divs = document.createElement('div')
                divs.classList.add(context)
                right_side.children[0].append(divs)
            }
            let h3 = document.createElement('h3')
            let span = document.createElement('span')
            let h3_p = document.createElement('h3')

            h3.innerText = item.name
            h3_p.innerText = item.price + '$'

            right_side.children[0].children[0].append(h3, span)
            right_side.children[0].children[1].append(h3_p)

            let prodInfo = document.createElement('p')
            prodInfo.innerText = item.description
            right_side.children[0].append(prodInfo)


            let colorOptions_h5 = document.createElement('h5')
            let colorOpt_h5 = document.createElement('h5')

            colorOptions_h5.innerText = 'Color'
            colorOpt_h5.innerText = 'Quantity'

            let colorOpt_div = document.createElement('div')
            let colorSubheadingDiv1 = document.createElement('div')
            let colorSubheadingDiv2 = document.createElement('div')

            colorOpt_div.classList.add('color_subheading')
            colorOpt_div.append(colorSubheadingDiv1, colorSubheadingDiv2)


            right_side.children[1].append(colorOptions_h5, colorOpt_div, colorOpt_h5)

            let product_quantity = ['product_tool', 'add_cart']
            for (let context of product_quantity) {
                let divs = document.createElement('div')
                divs.classList.add(context)
                right_side.children[2].append(divs)
            }

            let product_tool = ['-', '1', '+']
            for (let context of product_tool) {
                let divs = document.createElement('div')
                divs.innerText = context
                right_side.children[2].children[0].append(divs)
            }

            let addCartAnchor = document.createElement('a')
            let addCartImg = document.createElement('img')
            let addCartTxt = document.createElement('h5')


            addCartTxt.innerText = 'Add to cart'
            addCartAnchor.href = '#'
            addCartImg.src = 'images/logo/iconfinder_ic_shopping_cart_48px_3669231.svg'

            addCartAnchor.append(addCartImg, addCartTxt)
            right_side.children[2].children[1].append(addCartAnchor)


            let product_distribution = ['dist_preview', 'dist_indicators']
            for (let context of product_distribution) {
                let divs = document.createElement('div')
                divs.classList.add(context)
                right_side.children[3].append(divs)
            }

            let dist_preview = ['Main information', 'Delivery', 'Reviews']
            for (let context of dist_preview) {
                let divs = document.createElement('div')
                divs.innerText = context
                right_side.children[3].children[0].append(divs)
            }


            for (let i = 0; i < 3; i++) {
                let divs = document.createElement('div')
                right_side.children[3].children[1].append(divs)
            }

            //recommendation
            let recommendations = document.createElement('div')
            recommendations.classList.add('recommendations')

            let recommendation_img = document.createElement('div')
            recommendation_img.classList.add('recommendation_img')

            let recom_h2 = document.createElement('h2')
            recom_h2.innerText = 'Recommended'

            let img_src = ['images/products/Galaxy S21 5G.webp', 'images/products/Apple iPad Pro 11.png', 'images/products/HP Elite Folio 13.5.png', 'images/products/Xiaomi MI11 5G.png']
            for (let context of img_src) {
                let anchors = document.createElement('a')
                anchors.href = '#'
                recommendation_img.append(anchors)

                let recom_img = document.createElement('img')
                recom_img.src = context
                anchors.append(recom_img)
            }

            recommendations.append(recom_h2, recommendation_img)
            wrapper.append(recommendations)

            for (let item2 of brands) {
                if (item2.id == item.brand_id) {
                    span.innerText = item2.name
                }
            }

            wrapper.style.display = 'block'
            wrapper.style.opacity = '1'
            wrapper.style.zIndex = '9'
            wrapper.style.animation = 'myanima .3s linear alternate'
            bg_blur.classList.add('bg_active')

            close_page.onclick = () => {
                wrapper.style.opacity = '0'
                wrapper.style.zIndex = '-11'
                wrapper.style.animation = 'myanimaOFF .3s linear alternate'
                bg_blur.classList.remove('bg_active')
            }
        }
    }
}
reload(products)
console.log(products)
let fm = document.forms.search

fm.onsubmit = () => {
    event.preventDefault()
    fm.classList.toggle('fm_active')

    finally_sorted = []
    for (let item of products) {
        let word = event.target.children[0].value.toLowerCase().trim()

        if (item.name.toLowerCase().includes(word)) {
            finally_sorted.push(item)
            reload(finally_sorted)
        }
    }
}

let filtered_brands = []
let finally_sorted = []

let sort_br = document.querySelector('.sort_br').onclick = () => {
    event.preventDefault()

    filtered_brands = []
    finally_sorted = []

    for (let item of products) {
        for (let brand of sorted_brands) {
            if (item.brand_id == brand) {
                filtered_brands.push(item)
            }
        }
    }

    for (let item of filtered_brands) {
        if (item.price <= sorted2) {
            finally_sorted.push(item)
        }
    }

    reload(finally_sorted)
}

let sort_br_dl = document.querySelector('.sort_br_dl').onclick = () => {
    let name_brands = document.querySelectorAll('.name_brands')
    for (let item of products) {
        sortBrand_price.splice(sortBrand_price.indexOf(sortBrand_price.filter(el => el == item.id)[0]), 1)
        reload(products)
    }
    for (let item of name_brands) {
        item.classList.remove('ctg_active')
    }
    input_span.innerText = 300 + '$'
    console.log(sortBrand_price)

    for (let item of name_catg) {
        item.classList.remove('ctg_active_dark')
        item.classList.remove('ctg_active')

    }
}

cart_icon.onclick = () => {
    payment_page.style.display = 'block'
    payment_page.style.opacity = '1'
    payment_page.style.zIndex = '10'
    payment_page.style.animation = 'myanima .3s linear alternate'
    header.style.display = 'none'
    main_home_page.style.display = 'none'
    header_bt_img.style.display = 'none'
    footer.style.display = 'none'
}

close.onclick = () => {
    payment_page.style.opacity = '0'
    payment_page.style.zIndex = '-10'
    header.style.display = 'block'
    main_home_page.style.display = 'flex'
    header_bt_img.style.display = 'flex'
    footer.style.display = 'block'
    payment_page.style.animation = 'myanimaOFF .3s linear alternate'
}


let name_catg = document.querySelectorAll('.name_brands')
let links = document.querySelector('.home-page .links')
dark_mode.onclick = () => {
    event.target.style.display = 'none'
    light_mode.style.display = 'block'
    header.classList.add('dark_header')
    body.classList.add('dark_body')
    right_center.classList.add('dark_right')
    footer.classList.add('dark_footer')
    payment_page.classList.add('dark_payment')
    rightSide.classList.add('dark_calc')
    for (let item of name_catg) {
        if (item.classList.contains('ctg_active')) {
            item.classList.remove('ctg_active')
            item.classList.toggle('ctg_active_dark')
        }
    }
    if (body.classList.contains('dark_body')) {
        links.lastElementChild.classList.add('active_dark')
        links.lastElementChild.classList.remove('active')

    }
}
light_mode.onclick = () => {
    event.target.style.display = 'none'
    dark_mode.style.display = 'block'
    header.classList.remove('dark_header')
    body.classList.remove('dark_body')
    right_center.classList.remove('dark_right')
    footer.classList.remove('dark_footer')
    payment_page.classList.remove('dark_payment')
    rightSide.classList.remove('dark_calc')
    for (let item of name_catg) {
        if (item.classList.contains('ctg_active_dark')) {
            item.classList.remove('ctg_active_dark')
            item.classList.toggle('ctg_active')
        }
    }
    if (right_center.classList.contains('right_center')) {
        links.lastElementChild.classList.remove('active_dark')
        links.lastElementChild.classList.add('active')
    }
}