/****************************************************************************
 * Copyright 2021 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/

import { Elements, fromAtomsAttrs, FunctionalGroup } from 'ketcher-core'
import Editor from '../Editor'

class ChargeTool {
  editor: Editor
  charge: any

  constructor(editor, charge) {
    this.editor = editor
    this.editor.selection(null)
    this.charge = charge
  }

  mousemove(event) {
    const rnd = this.editor.render
    const ci = this.editor.findItem(event, ['atoms'], null)
    const struct = rnd.ctab.molecule
    if (
      ci &&
      ci.map === 'atoms' &&
      Elements.get(struct.atoms.get(ci.id)?.label as string | number)
    )
      this.editor.hover(ci)
    else this.editor.hover(null)
    return true
  }

  click(event) {
    const editor = this.editor
    const rnd = editor.render
    const struct = rnd.ctab.molecule
    const functionalGroups = struct.functionalGroups
    const ci = editor.findItem(event, ['atoms', 'bonds'], null)
    const atomResult: Array<any> = []
    const result: Array<any> = []
    if (ci && functionalGroups.size && ci.map === 'atoms') {
      const atomId = FunctionalGroup.atomsInFunctionalGroup(
        functionalGroups,
        ci.id
      )
      if (atomId !== null) atomResult.push(atomId)
    }
    if (atomResult.length > 0) {
      for (let id of atomResult) {
        const fgId = FunctionalGroup.findFunctionalGroupByAtom(
          functionalGroups,
          id
        )
        if (fgId !== null && !result.includes(fgId)) {
          result.push(fgId)
        }
      }
      this.editor.event.removeFG.dispatch({ fgIds: result })
      return
    }
    if (
      ci &&
      ci.map === 'atoms' &&
      Elements.get(struct.atoms.get(ci.id)?.label as string | number)
    ) {
      this.editor.hover(null)
      this.editor.update(
        fromAtomsAttrs(
          rnd.ctab,
          ci.id,
          {
            charge: struct.atoms.get(ci.id)?.charge + this.charge
          },
          null
        )
      )
    }
    return true
  }
}

export default ChargeTool
