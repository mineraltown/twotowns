var cookie_num = {
    "Chicken": {
        "normal": [2, 4, 6, 8],
        "potherb": [15, 30, 45, 60],
        "grain": [4, 8, 12, 16],
        "fish": [10, 20, 30, 40],
    },
    "Black_Chicken": {
        "normal": [1, 2, 3, 4],
        "potherb": [14, 28, 42, 56],
        "grain": [2, 4, 6, 8],
        "fish": [14, 28, 42, 56],
    },
    "Cow": {
        "normal": [7, 14, 21, 28],
        "potherb": [8, 16, 24, 32],
        "grain": [15, 30, 45, 60, ],
        "fish": [1, 2, 3, 4, ],
    },
    "Brown_Cow": {
        "normal": [4, 8, 12, 16],
        "potherb": [6, 12, 18, 24],
        "grain": [20, 40, 60, 80],
        "fish": [1, 2, 3, 4],
    },
    "Sheep": {
        "normal": [2, 4, 6, 8],
        "potherb": [12, 24, 36, 48],
        "grain": [12, 24, 36, 48],
        "fish": [5, 10, 15, 20],
    },
    "Black_Sheep": {
        "normal": [1, 2, 3, 4],
        "potherb": [15, 30, 45, 60],
        "grain": [9, 18, 27, 36],
        "fish": [6, 12, 18, 24],
    },
    "Alpaca": {
        "normal": [0, 0, 0, 0],
        "potherb": [15, 30, 45, 60],
        "grain": [15, 20, 25, 30],
        "fish": [15, 20, 25, 30],
    }
}

var animal_type = {
    "鸡": "Chicken",
    "黑鸡": "Black_Chicken",
    "牛": "Cow",
    "茶牛": "Brown_Cow",
    "羊": "Sheep",
    "黑羊": "Black_Sheep",
    "白色羊驼": "Alpaca",
    "茶色羊驼": "Alpaca"
}

// -----------------------------------------------------------------------------------------------

// 饼干选择器
function set_cookie(cookie_type, id) {
    f = [id + '_cookie_normal', id + '_cookie_potherb', id + '_cookie_grain', id + '_cookie_fish']
    for (var i in f) {
        document.getElementById(f[i]).style.backgroundColor = '#ddd'
        document.getElementById(f[i]).style.color = '#000'
    }
    var animal = JSON.parse(localStorage.szc_animal)
    var a = JSON.parse(animal[id])
    if (cookie_type != 'keep') {
        if (cookie_type == a['current']) {
            a['current'] = ""
        } else {
            a['current'] = cookie_type
        }
    }
    switch (a['current']) {
        case 'normal':
            document.getElementById(id + '_cookie_normal').style.backgroundColor = '#4bbead'
            document.getElementById(id + '_cookie_normal').style.color = '#fff'
            break
        case 'potherb':
            document.getElementById(id + '_cookie_potherb').style.backgroundColor = '#add58a'
            document.getElementById(id + '_cookie_potherb').style.color = '#fff'
            break
        case 'grain':
            document.getElementById(id + '_cookie_grain').style.backgroundColor = '#f9a870'
            document.getElementById(id + '_cookie_grain').style.color = '#fff'
            break
        case 'fish':
            document.getElementById(id + '_cookie_fish').style.backgroundColor = '#6ab4e6'
            document.getElementById(id + '_cookie_fish').style.color = '#fff'
            break
    }
    animal[id] = JSON.stringify(a)
    localStorage.szc_animal = JSON.stringify(animal)
}

// 刷新动物列表
function refresh_animal() {
    document.getElementById("animal_box").innerHTML = ""
    var animal = JSON.parse(localStorage.szc_animal)
    for (var i in animal) {
        var a = JSON.parse(animal[i])
        var x = document.createElement('div')
        x.id = a['name']
        x.className = "animal"
        var z = '<div class="animal_info">\
    <div class="name">' + a['name'] + '</div>\
    <div class="type">' + a['type'] + '</div>\
    <div>\
        <div class="cookies">\
            <div>\
                <div class="cookie" id="' + a['name'] + '_cookie_normal" onclick="set_cookie(\'normal\',\'' + a['name'] + '\')">普通</div>\
                <div><span class="num_now" id="' + a['name'] + '_cookie_normal_num">' + a['normal'] + '</span>/<span class="num_need" id="' + a['name'] + '_cookie_normal_num_need">' + cookie_num[animal_type[a['type']]]['normal'][a['plan'] - 1] + '</span></div>\
            </div>\
            <div>\
                <div class="cookie" id="' + a['name'] + '_cookie_potherb" onclick="set_cookie(\'potherb\',\'' + a['name'] + '\')">野菜</div>\
                <div><span class="num_now" id="' + a['name'] + '_cookie_potherb_num">' + a['potherb'] + '</span>/<span class="num_need" id="' + a['name'] + '_cookie_potherb_num_need">' + cookie_num[animal_type[a['type']]]['potherb'][a['plan'] - 1] + '</span></div>\
            </div>\
            <div>\
                <div class="cookie" id="' + a['name'] + '_cookie_grain" onclick="set_cookie(\'grain\',\'' + a['name'] + '\')">谷物</div>\
                <div><span class="num_now" id="' + a['name'] + '_cookie_grain_num">' + a['grain'] + '</span>/<span class="num_need" id="' + a['name'] + '_cookie_grain_num_need">' + cookie_num[animal_type[a['type']]]['grain'][a['plan'] - 1] + '</span></div>\
            </div>\
            <div>\
                <div class="cookie" id="' + a['name'] + '_cookie_fish" onclick="set_cookie(\'fish\',\'' + a['name'] + '\')">鱼味</div>\
                <div><span class="num_now" id="' + a['name'] + '_cookie_fish_num">' + a['fish'] + '</span>/<span class="num_need" id="' + a['name'] + '_cookie_normal_fish_need">' + cookie_num[animal_type[a['type']]]['fish'][a['plan'] - 1] + '</span></div>\
            </div>\
        </div>\
    </div>\
    <div class="open_edit" onclick="edit_animal(\'' + a['name'] + '\')" ><img src="edit-2-fill-active.svg" alt="edit"></div>\
</div>'
        x.innerHTML = z
        document.getElementById("animal_box").appendChild(x)
        if (a['current'] != "") {
            set_cookie('keep', a['name'])
        }
    }
}

// 计划增产
function plan(x, id, type, max) {
    var now_plan = parseInt(document.getElementById(id + "_" + type).value)
    if (x == 'add') {
        var new_plan = now_plan + 1
    } else if (x == 'subtract') {
        var new_plan = now_plan - 1
    } else {
        var new_plan = now_plan
    }
    if (type == "plan") {
        if (new_plan < 1) {
            var new_plan = 1
        } else if (new_plan > max) {
            var new_plan = max
        }
    } else {
        if (new_plan < 0) {
            var new_plan = 0
        }
    }
    document.getElementById(id + "_" + type).value = new_plan
}

// 最小值
function ArrayMin(arr) {
    var len = arr.length
    var min = Infinity
    while (len--) {
        if (arr[len] < min) {
            min = arr[len]
        }
    }
    return min
}

// 增产数量计算器
function f_num(id) {
    var cookies = ["normal", "potherb", "grain", "fish"]
    var animal_list = JSON.parse(localStorage.szc_animal)
    var animal = JSON.parse(animal_list[id])
    var increase_num = []
    for (var x in cookies) {
        var n = 1
        for (var y in cookie_num[animal_type[animal["type"]]][cookies[x]]) {
            var a = animal[cookies[x]]
            var b = cookie_num[animal_type[animal["type"]]][cookies[x]][y]
            if (a >= b) {
                n = parseInt(y) + 2
            }
        }
        increase_num.push(n)
    }
    return increase_num
}

// 修改动物&饼干数据
function edit_animal(id) {
    var animal = JSON.parse(localStorage.szc_animal)
    var a = JSON.parse(animal[id])
    if (document.getElementById('edit_animal_' + a['name']) == null) {
        var x = document.createElement('div')
        x.id = 'edit_animal_' + a['name']
        x.className = "animal_edit"
        var z = '<div class="edit_line">\
    <p class="edit_title">名字</p>\
    <p>' + a['name'] + '</p>\
</div>\
<div class="edit_line">\
    <p class="edit_title">类型</p>\
    <p>' + a['type'] + '</p>\
</div>\
<div class="edit_line">\
    <p class="edit_title">生日</p>\
    <p>第' + a['birthday']['Y'] + '年 ' + a['birthday']['D'] + '' + a['birthday']['M'] + '日</p>\
</div>\
<div class="edit_line">\
    <p class="edit_title">茶点数量</p>\
</div>\
<div class="edit_line">\
    <p class="edit_title_2">普通</p>\
    <button onclick="plan(\'subtract\',\'' + a['name'] + '\',\'normal\',999)">-</button>\
    <input onblur="plan(\'\',\'' + a['name'] + '\',\'normal\',999)" type="number" min="0" class="input_num" id="' + a['name'] + '_normal" value="' + a['normal'] + '">\
    <button onclick="plan(\'add\',\'' + a['name'] + '\',\'normal\',999)">+</button>\
</div>\
<div class="edit_line">\
    <p class="edit_title_2">野菜</p>\
    <button onclick="plan(\'subtract\',\'' + a['name'] + '\',\'potherb\',999)">-</button>\
    <input onblur="plan(\'\',\'' + a['name'] + '\',\'potherb\',999)" type="number" min="0" class="input_num" id="' + a['name'] + '_potherb" value="' + a['potherb'] + '">\
    <button onclick="plan(\'add\',\'' + a['name'] + '\',\'potherb\',999)">+</button>\
</div>\
<div class="edit_line">\
    <p class="edit_title_2">谷物</p>\
    <button onclick="plan(\'subtract\',\'' + a['name'] + '\',\'grain\',999)">-</button>\
    <input onblur="plan(\'\',\'' + a['name'] + '\',\'grain\',999)" type="number" min="0" class="input_num" id="' + a['name'] + '_grain" value="' + a['grain'] + '">\
    <button onclick="plan(\'add\',\'' + a['name'] + '\',\'grain\',999)">+</button>\
</div>\
<div class="edit_line">\
    <p class="edit_title_2">鱼味</p>\
    <button onclick="plan(\'subtract\',\'' + a['name'] + '\',\'fish\',999)">-</button>\
    <input onblur="plan(\'\',\'' + a['name'] + '\',\'fish\',999)" type="number" min="0" class="input_num" id="' + a['name'] + '_fish" value="' + a['fish'] + '">\
    <button onclick="plan(\'add\',\'' + a['name'] + '\',\'fish\',999)">+</button>\
</div>\
<div class="edit_line">\
    <p class="edit_title">当前产出</p>\
    <!-- farm_and_sideline_products_num -->\
    <p class="f_num">' + ArrayMin(f_num(a['name'])) + '</p>\
</div>\
<div class="edit_line">\
    <p class="edit_title">计划增产</p>\
    <span class="placeholder"></span>\
    <button onclick="plan(\'subtract\',\'' + a['name'] + '\',\'plan\',4)">-</button>\
    <input type="number" min="1" max="4" class="f_need" onblur="plan(\'\',\'' + a['name'] + '\',\'plan\',4)" id="' + a['name'] + '_plan" value="' + a['plan'] + '">\
    <button onclick="plan(\'add\',\'' + a['name'] + '\',\'plan\',4)">+</button>\
</div>\
<div class="edit_line_end">\
    <div class="all_submit" onclick="remove_animal(\'' + a['name'] + '\')">删除</div>\
    <div class="all_submit red" onclick="save_animal(\'' + a['name'] + '\')">保存</div>\
</div>'
        x.innerHTML = z
        document.getElementById(a['name']).appendChild(x)
    } else {
        document.getElementById('edit_animal_' + a['name']).remove()
    }
}

// 删除动物
function remove_animal(id) {
    var animal = JSON.parse(localStorage.szc_animal)
    if (confirm("确定要删除 " + id + " 吗？")) {
        delete animal[id]
        localStorage.szc_animal = JSON.stringify(animal)
        refresh_animal()
    }

}
// 保存动物
function save_animal(id) {
    var animal = JSON.parse(localStorage.szc_animal)
    var a = JSON.parse(animal[id])
    a['normal'] = parseInt(document.getElementById(a['name'] + "_normal").value)
    a['potherb'] = parseInt(document.getElementById(a['name'] + "_potherb").value)
    a['grain'] = parseInt(document.getElementById(a['name'] + "_grain").value)
    a['fish'] = parseInt(document.getElementById(a['name'] + "_fish").value)
    a['plan'] = document.getElementById(a['name'] + "_plan").value
    animal[id] = JSON.stringify(a)
    localStorage.szc_animal = JSON.stringify(animal)
    document.getElementById('edit_animal_' + a['name']).remove()
    refresh_animal()
}

// 新的一天
function new_day() {
    var today = parseInt(localStorage.szc_day)
    var tomorrow = today + 1
    if (tomorrow > 31) {
        tomorrow = 1
        if (localStorage.szc_month == '春') {
            localStorage.szc_month = '夏'
        } else if (localStorage.szc_month == '夏') {
            localStorage.szc_month = '秋'
        } else if (localStorage.szc_month == '秋') {
            localStorage.szc_month = '冬'
        } else if (localStorage.szc_month == '冬') {
            localStorage.szc_month = '春'
            localStorage.szc_year = parseInt(localStorage.szc_year) + 1
        }
    }
    localStorage.szc_day = tomorrow
    sync_date()

    var animal = JSON.parse(localStorage.szc_animal)
    for (var i in animal) {
        var a = JSON.parse(animal[i])
        if (a['current'] != "") {
            a[a['current']] = a[a['current']] + 1
            animal[a['name']] = JSON.stringify(a)
            localStorage.szc_animal = JSON.stringify(animal)
            document.getElementById(a['name'] + "_cookie_" + a['current'] + "_num").innerHTML = a[a['current']]
        }
    }
}

// -----------------------------------------------------------------------------------------------

// 初始化日期
function initialization_date() {
    localStorage.szc_year = 1
    localStorage.szc_month = '春'
    localStorage.szc_day = 1
}

// 页面日期同步
function sync_date() {
    document.getElementById("year").innerHTML = localStorage.szc_year
    document.getElementById("month").innerHTML = localStorage.szc_month
    document.getElementById("day").innerHTML = localStorage.szc_day
}

// -----------------------------------------------------------------------------------------------

// 季节选择器
function fseason(x, y) {
    f = [y + '_month_spring', y + '_month_summer', y + '_month_autumn', y + '_month_winter']
    for (var i in f) {
        document.getElementById(f[i]).style.backgroundColor = '#ddd'
        document.getElementById(f[i]).style.color = '#000'
    }
    switch (x) {
        case '春':
            document.getElementById(y + '_month_spring').style.backgroundColor = '#4bbead'
            document.getElementById(y + '_month_spring').style.color = '#fff'
            break
        case '夏':
            document.getElementById(y + '_month_summer').style.backgroundColor = '#add58a'
            document.getElementById(y + '_month_summer').style.color = '#fff'
            break
        case '秋':
            document.getElementById(y + '_month_autumn').style.backgroundColor = '#f9a870'
            document.getElementById(y + '_month_autumn').style.color = '#fff'
            break
        case '冬':
            document.getElementById(y + '_month_winter').style.backgroundColor = '#6ab4e6'
            document.getElementById(y + '_month_winter').style.color = '#fff'
            break
    }
    window[y + '_month'] = x
}

// 调整日期_初始化
function initialization_modification_date() {
    input_year.value = 1
    input_day.value = 1
    fseason('春', 'input')
}

// 调整日期
function modification_date() {
    if (document.getElementById("modification_date").style.display == 'block') {
        document.getElementById("modification_date").style.display = 'none'
    } else {
        document.getElementById("modification_date").style.display = 'block'
        input_year.value = localStorage.szc_year
        input_day.value = localStorage.szc_day
        fseason(localStorage.szc_month, 'input')
    }
}

// 调整日期_天
function day(x, y) {

    var now_day = parseInt(document.getElementById(y + "_day").value)
    if (x == 'add') {
        next_day = now_day + 1
    } else if (x == 'subtract') {
        next_day = now_day - 1
    } else {
        next_day = now_day
    }
    if (next_day > 31) {
        next_day = 1
    } else if (next_day < 1) {
        next_day = 31
    }
    document.getElementById(y + "_day").value = next_day
}

// 调整日期_年
function year(x, y) {
    var now_year = parseInt(document.getElementById(y + "_year").value)
    if (x == 'add') {
        next_year = now_year + 1
    } else if (x == 'subtract') {
        next_year = now_year - 1
    } else {
        next_year = now_year
    }
    if (next_year < 1) {
        next_year = 1
    }
    document.getElementById(y + "_year").value = next_year
}

// 保存调整日期
function modification_date_save() {
    document.getElementById("modification_date").style.display = 'none'
    localStorage.szc_year = input_year.value
    localStorage.szc_month = input_month
    localStorage.szc_day = input_day.value
    sync_date()
}

// -----------------------------------------------------------------------------------------------

// 添加动物_初始化
function add_animal_initialization() {
    add_animal_name.style.border = ''
    add_animal_name_title.style.color = ''
    add_animal_name.value = add_animal_name.defaultValue
    add_animal_type.value = '鸡'
    add_animal_birthday_year.value = localStorage.szc_year
    add_animal_birthday_day.value = localStorage.szc_day
    fseason(localStorage.szc_month, 'add_animal_birthday')
}

// 添加动物
function add_animal() {
    if (document.getElementById("add_animal").style.display == 'block') {
        document.getElementById("add_animal").style.display = 'none'
    } else {
        document.getElementById("add_animal").style.display = 'block'
        add_animal_initialization()
    }
}

// 编辑后检查
function animal_name_onblur(x) {
    var animal = JSON.parse(localStorage.szc_animal)
    if (add_animal_name.value in animal) {
        add_animal_name_title.style.color = 'firebrick'
        add_animal_name_warning.style.display = 'flex'
        add_animal_name_warning.innerHTML = '已经有动物叫这个了！'
        add_animal_name.style.border = 'solid 1px firebrick'
    } else {
        x.style.border = ''
        document.getElementById(x.id + '_title').style.color = ''
        add_animal_name_warning.style.display = 'none'
        add_animal_name_warning.innerHTML = ''
    }
}

// 保存动物
function add_animal_save() {
    var animal = JSON.parse(localStorage.szc_animal)
    if (add_animal_name.value == "") {
        add_animal_name_title.style.color = 'firebrick'
        add_animal_name_warning.style.display = 'flex'
        add_animal_name_warning.innerHTML = '给动物起个名字吧！'
        add_animal_name.style.border = 'solid 1px firebrick'
    } else {
        new_animal = {
            'name': add_animal_name.value,
            'type': add_animal_type.value,
            'birthday': {
                'Y': add_animal_birthday_year.value,
                'D': add_animal_birthday_month,
                'M': add_animal_birthday_day.value,
            },
            "normal": 0,
            "potherb": 0,
            "grain": 0,
            "fish": 0,
            "plan": 1,
            "current": '',
        }
        animal[new_animal['name']] = JSON.stringify(new_animal)
        localStorage.szc_animal = JSON.stringify(animal)
        document.getElementById("add_animal").style.display = 'none'
        refresh_animal()
    }
}