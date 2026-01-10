// Payload (полезная нагрузка) для JWT токена

export interface IJwtPayload {
  id: string;
  email: string;
  name: string;
  contactPhone: string;
}
