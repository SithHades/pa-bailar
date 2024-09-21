import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  private loadedScripts: Set<string> = new Set()

  constructor(@Inject(DOCUMENT) private document: Document) {}

  loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.loadedScripts.has(src)) {
        resolve()
        return
      }

      const script = this.document.createElement('script')
      script.type = 'text/javascript'
      script.src = src
      script.onload = () => {
        this.loadedScripts.add(src)
        resolve()
      }
      script.onerror = (error: any) => reject(error)
      this.document.body.appendChild(script)
    })
  }
}
