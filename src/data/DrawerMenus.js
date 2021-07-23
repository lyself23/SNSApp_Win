
//react-native-vector-icons/MaterialIcons
export default [
    {
      id : 10,
      label : '생산관리',
      enlabel : 'test',
      icon : 'check-box-outline',
      screen : '',
      subMenu : [{id : 11, label : '재고조회', enlabel : 'Search Stock', screen : 'SearchStockNavigator', icon : 'search'} , 
                 {id : 12, label : '창고이동', enlabel : 'Move Warehouse', screen : 'MoveNavigator', icon : 'all-inbox'}]
    },
    {
      id : 20,
      label : '재고관리',
      enlabel : 'test',
      icon : 'logout',
      screen : 'MoveNavigator',
      subMenu : []
    },
    {
      id : 30,
      label : '환경설정',
      enlabel : '',
      icon : 'check-box-outline',
      screen : '',
      subMenu : [{id : 31, label : '퀵메뉴 편집', enlabel : 'Quick Menu', screen : 'QuickMenu', icon : 'settings'},]
    },
  ]