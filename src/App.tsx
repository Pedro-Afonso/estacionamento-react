import { BrowserRouter } from "react-router-dom";

import { AppDrawerProvider, AppThemeProvider } from "./shared/contexts";
import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppThemeProvider>
          <AppDrawerProvider>
            <MenuLateral>
              <AppRoutes />
            </MenuLateral>
          </AppDrawerProvider>
        </AppThemeProvider>
      </BrowserRouter>
    </AppThemeProvider>
  );
};

export default App;
