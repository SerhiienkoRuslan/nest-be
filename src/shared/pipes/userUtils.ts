export const hasPermission = (id: number, user: { id: number, role?: string }) => {
  return id === user.id || user.role === 'admin'
}