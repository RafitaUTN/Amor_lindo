'use client'

import Banner from '@/components/Banner'
import QuickAccessCard from '@/components/QuickAccessCard'
import { useNavigation } from '@/hooks/useNavigation'
import { motion } from 'framer-motion'

export default function Inicio() {
  const { navigate } = useNavigation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto w-full"
    >
      <Banner />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <QuickAccessCard
          title="Nuestra Lista"
          description="Las canciones que cuentan nuestra historia"
          icon="music"
          onClick={() => navigate('playlist')}
        />
        <QuickAccessCard
          title="Nuestros Momentos"
          description="Fotografías de los mejores recuerdos juntos"
          icon="image"
          onClick={() => navigate('moments')}
        />
      </div>
    </motion.div>
  )
}