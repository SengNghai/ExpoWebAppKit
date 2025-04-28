import { useEffect, useState } from "react"
import { View, Text, Button } from "react-native"


/**
 * 安装提示
 * @returns 
 */
export default function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)

    useEffect(() => {
      // 判断是否是ios设备
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as unknown as { MSStream: boolean }).MSStream
      );
      // 检查是否已安装
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    }, [])
   
    if (isStandalone) {
      return null // Don't show install button if already installed
    }
   
    return (
      <View>
        <Text style={{color: 'red'}}>Install App</Text>
        <Button title="Add to Home Screen" />
        {isIOS && (
          <View>
            To install this app on your iOS device, tap the share button
            <Text role="img" aria-label="share icon">
              ⎋
            </Text>
            and then Add to Home Screen
            <Text role="img" aria-label="plus icon">
              ➕
            </Text>.
          </View>
        )}
      </View>
    )
  }
   