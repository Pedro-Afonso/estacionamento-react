import { BrowserRouter } from "react-router-dom";

import { AppDrawerProvider, AppThemeProvider } from "./shared/contexts";
import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";

export const App = () => {
  return (
    <AppThemeProvider>
      <AppDrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </AppDrawerProvider>
    </AppThemeProvider>
  );
};

export default App;
