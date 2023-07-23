import { createContext, useContext } from 'react'
import { ThemeModeComponent } from '../../../assets/ts/layout'
import { toAbsoluteUrl } from '../../../helpers'

export type ThemeModeType = 'dark'|'light'|'system'
export const themeModelSKey = 'kt_theme_mode_value'
export const themeMenuModeLSKey = 'kt_theme_mode_menu'

const systemMode = ThemeModeComponent.getSystemMode() as 'light'|'dark'

type ThemeModeContextType = {
    mode: ThemeModeType
    menuMode: ThemeModeType
    updateMode: (_mode: ThemeModeType) => void
    updateMenuMode: (_mode: ThemeModeType) => void
}

const themeModeSwitchHelper = (_mode: ThemeModeType) => {
    // change background image url
    const mode = _mode !== 'system' ? _mode : systemMode
    const imageUrl = '/media/patterns/header-bg' + (mode === 'light' ? '.jpg' : '-dark.png')
    document.body.style.backgroundImage = `url("${toAbsoluteUrl(imageUrl)}")`
}

const getThemeModeFromLocalStorage = (lsKey: string): ThemeModeType => {
    if (!localStorage) {
        return 'light'
    }

    const data = localStorage.getItem(lsKey)
    if (data === 'dark' || data === 'light' || data === 'system') {
        return data
    }

    if (document.documentElement.hasAttribute('data-bs-theme')) {
        const dataTheme = document.documentElement.getAttribute('data-bs-theme')
        if (dataTheme && (dataTheme === 'dark' || dataTheme === 'light' || dataTheme === 'system')) {
            return dataTheme
        }
    }

    return 'system'
}

const defaultThemeMode: ThemeModeContextType = {
    mode: getThemeModeFromLocalStorage(themeModelSKey),
    menuMode: getThemeModeFromLocalStorage(themeMenuModeLSKey),
    updateMode: (_mode: ThemeModeType) => {
    },
    updateMenuMode: (_menuMode: ThemeModeType) => {
    },
}

const ThemeModeContext = createContext<ThemeModeContextType>({
    mode: defaultThemeMode.mode,
    menuMode: defaultThemeMode.menuMode,
    updateMode: (_mode: ThemeModeType) => {
    },
    updateMenuMode: (_menuMode: ThemeModeType) => {
    },
})

const useThemeMode = () => useContext(ThemeModeContext)

export { useThemeMode, systemMode, themeModeSwitchHelper }
