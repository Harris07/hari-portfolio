import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'

const ABOUT_TEXT =
  'With 7+ years of experience in UI/UX and Product Design, I design intuitive, user-focused digital products that solve real problems and deliver measurable results. I combine strategic thinking, user research, and modern design principles to create experiences that are both beautiful and effective. Let’s turn great ideas into exceptional products.'

const MOON_URL = '/images/moon.png'
const OBJ_BL_URL = '/images/obj-bl.png'
const LEGO_URL = '/images/lego.png'
const OBJ_BR_URL = '/images/obj-br.png'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
      style={{ background: 'linear-gradient(135deg, #131400 0%, #1e1f00 40%, #131400 100%)' }}
    >
      {/* Top-left: Moon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[72px] sm:w-[160px] md:w-[210px] pointer-events-none"
      >
        <img src={MOON_URL} alt="" className="w-full h-auto" />
      </FadeIn>

      {/* Bottom-left: 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[60px] sm:w-[140px] md:w-[180px] pointer-events-none"
      >
        <img src={OBJ_BL_URL} alt="" className="w-full h-auto" />
      </FadeIn>

      {/* Top-right: Lego */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[72px] sm:w-[160px] md:w-[210px] pointer-events-none"
      >
        <img src={LEGO_URL} alt="" className="w-full h-auto" />
      </FadeIn>

      {/* Bottom-right: 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[76px] sm:w-[170px] md:w-[220px] pointer-events-none"
      >
        <img src={OBJ_BR_URL} alt="" className="w-full h-auto" />
      </FadeIn>

      {/* Content */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 relative z-10">
        <FadeIn delay={0} y={40}>
          <div className="flex flex-col items-center gap-4">
            <p className="uppercase tracking-[0.22em] text-xs font-semibold"
              style={{ color: '#F1FF58', fontFamily: "'Poppins', sans-serif" }}>
              Who I am
            </p>
            <h2
              className="font-semibold leading-tight text-center"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#ffffff', fontFamily: "'Poppins', sans-serif" }}
            >
              About me
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium text-center leading-relaxed max-w-[560px]"
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            }}
          />
          <ContactButton />
        </div>
      </div>
    </section>
  )
}
