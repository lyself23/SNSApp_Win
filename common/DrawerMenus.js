export default [
    {
      mainName : '생산관리',
      icon : 'check-box-outline',
      screen : '',
      subMenu : [{label : '재고조회', enlabel : 'Search Stock', screen : 'SearchStockNavigator', icon : 'search'} , 
                 {label : '창고이동', enlabel : 'Move Warehouse', screen : 'MoveNavigator', icon : 'all-inbox'}]
    },
    {
      mainName : '재고관리',
      icon : 'warehouse',
      screen : '',
      subMenu : [{label : '재고관리1', enlabel : 'Stock1', screen : 'Home', icon : 'menu'} , 
                 {label : '재고관리2', enlabel : 'Stock2', screen : 'Notifications', icon : 'menu'}]
    },
    {
      mainName : '환경설정',
      icon : 'settings-helper',
      screen : '',
      subMenu : [{label : '퀵메뉴 편집', enlabel : 'Quick Menu', screen : 'QuickMenu', icon : 'settings'},]
    },
  ]