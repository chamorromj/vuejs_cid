export function toggleSideMenu( state ) {
  state.isSideMenuOpen = !state.isSideMenuOpen
}

export function toggleSideMenuFromHome( state ) {
  if(state.isSideMenuOpen){
    state.isSideMenuOpen = !state.isSideMenuOpen
  }

}
