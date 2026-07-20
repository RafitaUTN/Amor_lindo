'use client'

import { motion } from 'framer-motion'
import Banner from '@/components/Banner'
import QuickAccessCard from '@/components/QuickAccessCard'
import { useNavigation } from '@/hooks/useNavigation'

export default function InicioPage() {
  const { navigate } = useNavigation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <Banner />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <QuickAccessCard
          title="Nuestra Lista"
          description="Las canciones que cuentan nuestra historia"
          icon="music"
          onClick={() => navigate('playlist')}
        />
        <QuickAccessCard
          title="Nuestros Momentos"
          description="Fotografías que atesoramos juntos"
          icon="image"
          onClick={() => navigate('moments')}
        />
      </div>
    </motion.div>
  )
}