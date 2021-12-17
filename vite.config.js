import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import pxtovw from 'postcss-px-to-viewport'
const loder_pxtovw=pxtovw({
    // viewportWidth: 200,
    // viewportUnit: 'vw',
    viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750 
    viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置 
    unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除） 
    viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw 
    selectorBlackList: ['.ignore', '.hairlines', ], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名 
    exclude: [/node_modules/, /pc/], //If value is regexp, will ignore the matches files.If value is array, the elements of the array are regexp.
    minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值 
    mediaQuery: false // 允许在媒体查询中转换`px`
})

// https://vitejs.dev/config/
export default defineConfig(({ command, mode })=>{
  const isEnvProduction = mode === 'production'
  return {
    plugins: [vue()],
    css: {
        postcss:{
            plugins: [loder_pxtovw]
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    optimizeDeps: {
        include: ['axios']
    },
    build: {
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                manualChunks(id){
                    if(id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        },
        terserOptions: {
            compress: {
              // 生产环境去除console
              drop_console: isEnvProduction
            }
        }
    },
    
    server: {
        host: '0.0.0.0',
        port: 3030,
        hot: true,
        open: true
    }
  }
})
