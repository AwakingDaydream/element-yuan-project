---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: './public/miku.png',
    name: 'China Yuan',
    title: 'Owner',
    links: [
      { icon: 'github', link: 'https://awakingdaydream.github.io/element-yuan-project/' },
      { icon: 'bilibili', link: 'https://awakingdaydream.github.io/element-yuan-project/' },
      { icon: 'youtube', link: 'https://awakingdaydream.github.io/element-yuan-project/' },
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      你好
    </template>
    <template #lead>
      现在是 YYYY-MM-DD HH：mm：ss
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
