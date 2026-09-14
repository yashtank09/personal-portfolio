import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';
@Component({
  selector: 'yt-code-block',
  template: `
    <div class="code">
      <div class="mono">JAVA</div>
      <pre
        tabindex="0"
        aria-label="Java code example"
      ><code>@for(token of tokens();track $index){<span [class]="token.kind">{{token.text}}</span>}</code></pre>
    </div>
  `,
  styleUrl: './code-block.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly tokens = computed(() =>
    this.code()
      .split(
        /(\/\/[^\n]*|"[^"\n]*"|\b(?:public|static|void|class|record|return|new|int|long|if|else|while|var|import|throw)\b)/g,
      )
      .map((text) => ({
        text,
        kind: text.startsWith('//')
          ? 'comment'
          : text.startsWith('"')
            ? 'string'
            : /^(public|static|void|class|record|return|new|int|long|if|else|while|var|import|throw)$/.test(
                  text,
                )
              ? 'keyword'
              : '',
      })),
  );
}
