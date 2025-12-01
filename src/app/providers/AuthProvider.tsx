import { ReactNode, useState, useCallback } from 'react'
import { removeAccessToken } from '@services/storageService'
import { AuthContext, AuthContextType } from '@shared/contexts'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthContextType['user']>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // TODO: Call API to login
      // const response = await authService.login(email, password)
      // setAccessToken(response.token)
      // setUser(response.user)
      console.log('Login:', email, password)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    removeAccessToken()
    setUser(null)
  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
