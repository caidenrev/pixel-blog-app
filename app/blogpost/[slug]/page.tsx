import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkFrontmatter from "remark-frontmatter" 
import remarkRehype from "remark-rehype"
import rehypeSlug from 'rehype-slug'
import rehypeStringify from "rehype-stringify"
import rehypeHighlight from "rehype-highlight"
import matter from "gray-matter"
import fs from "fs"
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { rehypePrettyCode } from 'rehype-pretty-code'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import { Metadata, ResolvingMetadata } from 'next'
import BackToTopButton from '@/components/BackToTopButton'
import MobileTableOfContents from '@/components/MobileTableOfContents'

type Props = {
  params: { slug: string, title: string, description: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype) 
    .use(rehypeStringify) 
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      transformers: [
        transformerCopyButton({
          visibility: 'always',
          feedbackDuration: 3_000,
        }),
      ],
    })
    .use(rehypeAutolinkHeadings)

  const filePath = `content/${params.slug}.md`
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const {data, content} = matter(fileContent)

  const htmlContent = (await processor.process(content)).toString()
  
  // Extract headings for TOC
  const extractHeadings = (html: string) => {
    const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[1-6]>/g
    const headings = []
    let match
    
    while ((match = headingRegex.exec(html)) !== null) {
      headings.push({
        level: parseInt(match[1]),
        id: match[2],
        text: match[3].replace(/<[^>]*>/g, ''), // Remove HTML tags
      })
    }
    
    return headings
  }

  const tableOfContents = extractHeadings(htmlContent)
  {/* Mobile Table of Contents - Collapsible */}
  <MobileTableOfContents tableOfContents={tableOfContents} />
  
  return (
    <MaxWidthWrapper className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'> 
    {/* Mobile Table of Contents - Moved to top */}
      <MobileTableOfContents tableOfContents={tableOfContents} />
      {/* Header Section */}
      <div className='py-8 border-b border-gray-200 dark:border-gray-700 mb-8'>
        <div className='text-center'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight'>
            {data.title}
          </h1>
          {data.description && (
            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              {data.description}
            </p>
          )}
          {data.date && (
            <div className='mt-4 text-sm text-gray-500 dark:text-gray-400'>
              <time dateTime={data.date}>
                {new Date(data.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          )}
        </div>
      </div>

      

      {/* Main Content Layout */}
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'> 
        {/* Main Article */}
        <article className='flex-1 min-w-0'> 
          <div className='prose prose-lg dark:prose-invert max-w-none
                         prose-headings:font-semibold 
                         prose-p:leading-relaxed
                         prose-a:no-underline hover:prose-a:underline
                         prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                         prose-pre:rounded-lg prose-pre:text-sm
                         prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:border-l-4
                         prose-img:rounded-lg prose-img:shadow-lg
                         prose-hr:my-8'> 
            <div dangerouslySetInnerHTML={{__html: htmlContent}}></div> 
          </div>
        </article>

        {/* Desktop Table of Contents */}
        <aside className='hidden lg:block lg:w-80 flex-shrink-0'>
          <div className='sticky top-8'>
            <div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Daftar Isi
              </h3>
              {tableOfContents.length > 0 ? (
                <nav className="space-y-2">
                  {tableOfContents.map((heading, index) => (
                    <a
                      key={index}
                      href={`#${heading.id}`}
                      className={`block text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                        heading.level === 1 ? 'font-semibold text-gray-900 dark:text-white' :
                        heading.level === 2 ? 'pl-3 text-gray-700 dark:text-gray-300' :
                        heading.level === 3 ? 'pl-6 text-gray-600 dark:text-gray-400' :
                        'pl-9 text-gray-500 dark:text-gray-500'
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tidak ada heading yang ditemukan
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>


      {/* Back to Top Button */}
      <BackToTopButton />
    </MaxWidthWrapper>
  )
}  

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const filePath = `content/${params.slug}.md`
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const {data} = matter(fileContent)
  
  return {
    title: `${data.title} - ProgrammingWithHarry`, 
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'article',
      publishedTime: data.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
    }
  }
}