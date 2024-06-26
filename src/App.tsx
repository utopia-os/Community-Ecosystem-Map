import { AppShell, SideBar, Content, AuthProvider, Modal, LoginPage, SignupPage, Quests, RequestPasswordPage, SetNewPasswordPage, OverlayProfile, OverlayProfileSettings, OverlayUserSettings, OverlayItemsIndexPage, OverlayItemProfile, OverlayItemProfileSettings, Permissions, Tags } from 'utopia-ui'
import { bottomRoutes, routes } from './routes/sidebar'
import { Route, Routes } from 'react-router-dom'
import MapContainer from "./pages/MapContainer"
import './App.css'
import { userApi } from './api/userApi'
import { assetsApi } from './api/assetsApi'
import { ModalContent } from './ModalContent'
import { MoonCalendar } from 'utopia-ui'
import { Landingpage } from './pages/Landingpage'
import { useEffect, useState } from 'react'
import { itemsApi } from './api/itemsApi'
import { permissionsApi } from './api/permissionsApi'
import { Tag } from 'utopia-ui/dist/types'


function App() {


  const [permissionsApiInstance, setPermissionsApiInstance] = useState<permissionsApi>();
  const [tagsApi, setTagsApi] = useState<itemsApi<Tag>>();


  useEffect(() => {

    setPermissionsApiInstance(new permissionsApi());
    setTagsApi(new itemsApi<Tag>('tags', undefined, "36fc9ba7-1a6b-4fc2-9db1-39d67aaf6918"));
  }, [])


  return (

    <div className="App overflow-x-hidden">

      <AuthProvider userApi={new userApi}>
        <AppShell assetsApi={new assetsApi("https://api.utopia-lab.org/assets/")} appName="Community Map" nameWidth={220}>
          <Permissions api={permissionsApiInstance} adminRole='8ed0b24e-3320-48cd-8444-bc152304e580'></Permissions>
          <Tags api={tagsApi}></Tags>
          <Modal>
            <ModalContent />
          </Modal>
          <SideBar routes={routes} bottomRoutes={bottomRoutes} />
          <Content>
            <Quests />
            <Routes>
              <Route path="/*" element={<MapContainer />}>
                <Route path='login' element={<LoginPage />} />
                <Route path='signup' element={<SignupPage />} />
                <Route path='reset-password' element={<RequestPasswordPage reset_url="https://map.collaborative-finance.org/set-new-password/" />} />
                <Route path='set-new-password' element={<SetNewPasswordPage />} />
                <Route path="profile/*" element={<OverlayProfile />} />
                <Route path="item/*" element={<OverlayItemProfile />} />
                <Route path="edit-item/*" element={<OverlayItemProfileSettings />} />
                <Route path="profile-settings" element={<OverlayProfileSettings />} />
                <Route path="user-settings" element={<OverlayUserSettings />} />
                <Route path="moon-calendar" element={<MoonCalendar />} />
                <Route path="landingpage" element={<Landingpage />} />
                <Route path="items" element={<OverlayItemsIndexPage type='project' breadcrumbs={[{ name: "Home", path: "/" }, { name: "Projects", path: "/items/" }]} itemNameField={'name'} itemTextField={'text'} itemImageField={'image'} url={'/item/'} parameterField={'id'} itemSymbolField={'symbol'} itemSubnameField={'subname'} />} />
                <Route path="calendar" element={<OverlayItemsIndexPage type="event" breadcrumbs={[{ name: "Home", path: "/" }, { name: "Events", path: "/calendar/" }]} itemNameField={'name'} itemTextField={'text'} itemImageField={'image'} url={'/item/'} parameterField={'id'} itemSymbolField={'symbol'} itemSubnameField={'subname'} />} />
                <Route path="community" element={<OverlayItemsIndexPage type='user' breadcrumbs={[{ name: "Home", path: "/" }, { name: "Community", path: "/community/" }]} itemNameField={'name'} itemTextField={'text'} itemImageField={'image'} url={'/item/'} parameterField={'id'} itemSymbolField={'symbol'} itemSubnameField={'subname'} plusButton={false}/>} />

              </Route>

            </Routes>
          </Content>
        </AppShell>
      </AuthProvider>
    </div>
  )
}

export default App
