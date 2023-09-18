import dotenv from 'dotenv'

import { ConfigContext, ExpoConfig } from '@expo/config'

dotenv.config()

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID ?? 'timothymiller',
    },
  },
  owner: process.env.EAS_OWNER ?? '85fc6ccd-0ce1-4e4d-804c-b15df989f97e',
  plugins: ['expo-router'],
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
})
